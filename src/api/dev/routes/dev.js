module.exports = {
  routes: [
    {
      method: "GET",
      path: "/dev/get-types-file",
      handler: "dev.getTypesFile",
      config: {
        auth: false, // we check node_env=development
      },
    },
    {
      method: "GET",
      path: "/dev/all-routes",
      handler: "dev.getAllRoutes",
      config: {
        auth: false, // we check node_env=development
      },
    },
  ],
};
