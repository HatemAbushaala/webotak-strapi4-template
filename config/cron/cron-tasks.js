module.exports = {
  myJob: {
    task: async ({ strapi }) => {
      console.log("cron-task");
    },
    options: {
      rule: "* * * * *",
      // rule: "0 */8 * * *",
    },
  },
};
