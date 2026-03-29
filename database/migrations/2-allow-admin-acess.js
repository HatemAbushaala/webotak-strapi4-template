const { allowAdminAccessToAction } = require("../../src/lib/adminRole");

const up = async (knex) => {
  /*   // profile
  await allowAdminAccessToAction("plugin::users-permissions.user.me");
  // manage users
  await allowAdminAccessToAction("plugin::users-permissions.user.find");
  await allowAdminAccessToAction("plugin::users-permissions.user.create");
  await allowAdminAccessToAction("plugin::users-permissions.user.update");
  await allowAdminAccessToAction("plugin::users-permissions.user.destroy");
  // manage roles
  await allowAdminAccessToAction("plugin::users-permissions.role.createRole");
  await allowAdminAccessToAction("plugin::users-permissions.role.deleteRole");
  await allowAdminAccessToAction("plugin::users-permissions.role.updateRole");
  await allowAdminAccessToAction("plugin::users-permissions.role.find");
  await allowAdminAccessToAction("plugin::users-permissions.role.findOne");
  // role permissions
  await allowAdminAccessToAction(
    "api::users-permission.users-permission.getRoutesPermissions"
  );
  await allowAdminAccessToAction(
    "api::users-permission.users-permission.getRoles"
  );
  await allowAdminAccessToAction(
    "api::users-permission.users-permission.getRole"
  ); */
};

module.exports = {
  up,
};
