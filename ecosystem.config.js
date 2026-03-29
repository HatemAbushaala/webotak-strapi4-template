module.exports = {
  apps: [
    {
      name: "strapi",
      script: "npm",
      args: "start", // start
      instances: 3,
      exec_mode: "cluster",
      increment_var: "PORT",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
