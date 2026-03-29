const { findOrCreate } = require("../helpers/queryUtils");

/* 
    give access to option.find to 'admin' and 'doctor'
    example: yarn cmd allow-access option find admin doctor
*/
module.exports = async (strapi) => {
  // get roles
  let [api, action, ...selectedRoles] = process.argv.slice(3);

  if (api && action && selectedRoles.length === 0) throw "please specify roles";

  let roles = await strapi.db
    .query("plugin::users-permissions.role")
    .findMany();

  // make sure that we receive valid roles, if we got 1 invalid role name throw error
  if (
    selectedRoles.length > 0 &&
    selectedRoles.some(
      (roleName) => !roles.find((dbRole) => dbRole.name === roleName)
    )
  ) {
    throw "invalid roles list";
  }

  // "api::users-permission.users-permission.getRoutesPermissions"

  if (api) {
    let [_api, controller] = api.split(".");
    controller = controller ?? _api;
    if (action) {
      // ######################################
      // open access only for this action

      // if we just get api name ( ex: product ) then we will use the default controller name (ex: product ) and the path will be
      // api::product.product.actionName
      // but if we receive api as 'product.controllerName' the path will be
      // api::product.controllerName.actionName
      const db_action = `api::${_api}.${controller}.${action}`;
      //   check if this action is available
      if (!getRoute(_api, controller, action))
        throw "we could not find the route specified";

      for (let role of selectedRoles) {
        const dbRole = roles.find((r) => r.name === role);
        if (!dbRole) continue;
        await findOrCreate(
          "plugin::users-permissions.permission",
          {
            action: db_action,
            role: dbRole.id,
          },
          {
            action: db_action,
            role: dbRole.id,
          }
        );
      }

      return console.log("done");
    } else {
      // ######################################
      // open access only for this api actions
      await addApiAccessToRoles(_api, roles);
    }
  } else {
    // ######################################
    // open access to all routes based on routes config roles array
    for (let apiName in strapi.api) {
      await addApiAccessToRoles(apiName, roles);
    }
  }
};

const getRoute = (apiName, controller, action) => {
  const api = strapi.api[apiName];
  if (!api) return;
  //  loop through default strapi routes file and custom routes files
  for (let route_file_name in api.routes) {
    const route_file = api.routes[route_file_name];
    let route = route_file.routes.find(
      (r) =>
        r.handler === `api::${apiName}.${controller}.${action}` ||
        r.handler === `${controller}.${action}`
    );
    if (route) return route;
  }
};
const getApiRoutes = (apiName) => {
  const api = strapi.api[apiName];
  if (!api) throw "api not found";

  const routes = [];
  //  loop through default strapi routes file and custom routes files
  for (let route_file_name in api.routes) {
    const route_file = api.routes[route_file_name];
    routes.push(...route_file.routes);
  }
  return routes;
};

const addApiAccessToRoles = async (_api, roles) => {
  for (let route of getApiRoutes(_api)) {
    // each route may contain config contain roles (skip if not)
    const route_roles = route.config?.roles;
    if (!route_roles || !Array.isArray(route_roles)) continue;

    // strapi routes will be 'api::option.option.find' but our custom routes will be shorter 'option.customFind'
    // we need to change it to 'api::option.option.customFind'
    const db_action =
      route.handler.split(".").length < 3
        ? `api::${_api}.${route.handler}`
        : route.handler;
    for (let role of route_roles) {
      const dbRole = roles.find((r) => r.name === role);
      if (!dbRole) continue;

      await findOrCreate(
        "plugin::users-permissions.permission",
        {
          action: db_action,
          role: dbRole.id,
        },
        {
          action: db_action,
          role: dbRole.id,
        }
      );
    }
  }
};
