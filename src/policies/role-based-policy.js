"use strict";

/**
 * `center-policy` policy
 */

module.exports = async (ctx, config, { strapi }) => {
  const user = ctx.state.user;

  if (!user) return false;

  if (user.role.name === "admin") return true;

  ctx.state.someData = { data: "data from policy" };
  return true;
};
