const fs = require("fs");
const path = require("path");
const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

jest.setTimeout(15000);
beforeAll(async () => {
  await setupStrapi();

  // generate full access api token so that we can use it on our tests
  const { accessKey } = await strapi.service("admin::api-token").create({
    name: "tests-token",
    type: "full-access",
    lifespan: 604800000,
  });
  global.testApiToken = accessKey;
});

afterAll(async () => {
  await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

function requireAllTests(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    // exclude app.test.js  file from require
    if (file === path.basename(__filename) || file === "helpers") return;

    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      requireAllTests(filePath); // Recursive call for subdirectories
    } else if (file.endsWith(".js")) {
      require(filePath);
    }
  });
}
// we need to require tests after defining strapi instance
//// require single test
// require("./user");
//// require all tests
requireAllTests(__dirname);
