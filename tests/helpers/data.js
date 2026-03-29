const { Common, Attribute, Utils } = require("@strapi/strapi");
const { randomUUID } = require("crypto");
/**
 *
 * @template {"plugin::users-permissions.user"} T
 * @template {Attribute.GetKeys<T>[]} F
 * @param {object} config other optional attributes
 * @returns {Promise<Attribute.GetValues<T, Utils.Array.Values<F>>  & { id:number, jwt: string }>} user object with jwt
 */
const createTestUser = async (config = {}) => {
  let randomName = randomUUID();
  const name = config?.name || randomName;
  const user_type = config.user_type || "authenticated";

  const role = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: user_type } });

  const newUser = await strapi.plugins["users-permissions"].services.user.add({
    ...config,
    username: randomName,
    name,
    email: randomName + "@gmail.com",
    password: "123456",
    role: role.id,
    provider: "local",
  });

  const newUserToken = strapi.plugins["users-permissions"].services.jwt.issue({
    id: newUser.id,
  });

  newUser.jwt = newUserToken;

  return newUser;
};

module.exports = { createTestUser };
