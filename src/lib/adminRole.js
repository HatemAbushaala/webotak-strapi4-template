let ROLE_TYPE = "admin";
const getAdminRole = async () => {
  let adminRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: ROLE_TYPE,
      },
    });
  return adminRole;
};

const createAdminRole = () => {
  return strapi.db.query("plugin::users-permissions.role").create({
    data: {
      name: ROLE_TYPE,
      type: ROLE_TYPE,
      description: ROLE_TYPE,
    },
  });
};

const getOrCreateAdminRole = async () => {
  let adminRole = await getAdminRole();
  if (!adminRole) {
    adminRole = await createAdminRole();
  }
  return adminRole;
};

const allowAdminAccessToAction = async (action) => {
  let adminRole = await getOrCreateAdminRole();

  // check if already exist to avoid creating duplicate entry
  let existing_permission = await strapi.db
    .query("plugin::users-permissions.permission")
    .findOne({
      where: {
        action,
        role: adminRole.id,
      },
    });
  if (!existing_permission)
    await strapi.db.query("plugin::users-permissions.permission").create({
      data: {
        action,
        role: adminRole.id,
      },
    });
};

module.exports = {
  getAdminRole,
  createAdminRole,
  getOrCreateAdminRole,
  allowAdminAccessToAction,
};
