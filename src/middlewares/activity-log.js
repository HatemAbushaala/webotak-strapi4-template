"use strict";
const _ = require("lodash");
/**
 * `activity-log` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    await next();
    // we need to add our logic after next so we can access ctx.stat.user, plus we need to get response body after request handler run
    const response_status = ctx.response.status;
    let is_success = response_status >= 200 && response_status < 300;
    try {
      let method = ctx.request.method;
      let action = {
        POST: "create",
        PUT: "update",
        DELETE: "delete",
      };

      const strapi_route = ctx.state.route;

      const response_body = ctx.response?.body ?? {};

      if (is_success) {
        if (strapi_route.path === "/auth/local")
          return logAction({
            ctx,
            model: "users",
            action: "login",
            user: response_body?.user?.id,
          });
        else if (strapi_route.path === "/auth/local/register")
          return logAction({
            ctx,
            model: "users",
            action: "register",
            user: response_body?.user?.id,
          });
        else if (method in action && is_success && strapi_route.info.apiName) {
          return logAction({ ctx, action: action[method] });
        }
      }
    } catch (err) {
      console.log("fail to run activity-log middleware", err);
    }
  };
};

const logAction = ({
  // required
  ctx = {},
  // required
  action,
  // optional
  model,
  // optional
  user = null,
}) => {
  return strapi.db.query("api::activity.activity").create({
    data: {
      model: model ?? ctx.state.route.info.apiName,
      operation: action,
      user: user ?? ctx.state?.user?.id,
      payload: {
        request: {
          method: ctx.request.method,
          url: ctx.request.url,
          body: ctx.request?.body,
          params: ctx.request?.params,
        },
        response: {
          body: ctx.response?.body,
        },
      },
    },
  });
};
