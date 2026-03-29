const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;

    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");

  //close server to release the db-file
  await strapi.server.httpServer.close();
  //delete test database after all tests have completed
  if (dbSettings && dbSettings.client === "mysql") {
    // clean database
    await strapi.db.connection.raw(
      `drop database ${dbSettings.connection.database}`
    );
    await strapi.db.connection.raw(
      `create database ${dbSettings.connection.database}`
    );

    // close the connection to the database after deleting the database
    await strapi.db.connection.destroy();
  } else if (dbSettings && dbSettings.connection.filename) {
    // close the connection to the database before deletion
    await strapi.db.connection.destroy();

    // remove tmp db file
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi };
