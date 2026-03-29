const { getOrCreateAdminRole } = require("../../src/lib/adminRole");

const up = async (knex) => {
  /*   let adminRole = await getOrCreateAdminRole();
  // create admin account
  await strapi.db.query("plugin::users-permissions.user").create({
    data: {
      username: "admin",
      first_name: "admin",
      last_name: "admin",
      email: "admin@admin.com",
      provider: "local",
      password: "12345678",
      confirmed: true,
      blocked: null,
      role: adminRole.id,
    },
  }); */
};

module.exports = {
  up,
};
