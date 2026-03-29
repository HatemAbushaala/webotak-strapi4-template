const path = require("path");
const strapi = require("@strapi/strapi");

const app = strapi();
app.load().then(async (strapiInstance) => {
  //   search for file based  on command second argument
  const commandRunner = require(path.join(__dirname, process.argv[2]));

  try {
    // run default exported function and pass strapi instance
    await commandRunner(strapiInstance);
  } catch (error) {
    // catch any error
    console.error("command fail with error", error);
  } finally {
    // stop instance after finish the task
    strapiInstance.stop(0);
  }
});
