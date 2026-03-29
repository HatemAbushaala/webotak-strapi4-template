const { getService } = require("@strapi/plugin-users-permissions/server/utils");
const { sanitize } = require("@strapi/utils");

const sanitizeOutput = async (user, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user");
  const { auth } = ctx.state;
  //   before
  //   return sanitize.contentAPI.output(user, schema, { auth });
  //   after ( this way we don't need to setup permission for relations)
  return sanitize.contentAPI.output(user, schema);
};

const sanitizeQuery = async (query, ctx) => {
  const schema = strapi.getModel("plugin::users-permissions.user");
  const { auth } = ctx.state;

  return sanitize.contentAPI.query(query, schema, { auth });
};

async function me(ctx) {
  const authUser = ctx.state.user;
  const { query } = ctx;

  if (!authUser) {
    return ctx.unauthorized();
  }

  const sanitizedQuery = await sanitizeQuery(query, ctx);

  const user = await getService("user").fetch(authUser.id, sanitizedQuery);
  return sanitizeOutput(user, ctx);
}

module.exports = me;
