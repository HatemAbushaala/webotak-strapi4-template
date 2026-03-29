const fs = require("fs").promises;
const { exec } = require("child_process");
const path = require("path");

module.exports = async () => {
  let [controller, action] = process.argv.slice(3);

  const target_route = getRoute(controller, controller, action);

  if (!target_route) throw Error("we couldnot find route");

  const filePath = path.join(
    __dirname,
    `../../tests/${controller}.${action}Test.js`
  );
  await fs.writeFile(filePath, getTestContent(target_route), "utf-8");

  exec(`code ${filePath}`);

  console.log("✅ test file created successfully");
};

const getRoute = (apiName, controller, action) => {
  const api = strapi.api[apiName];
  if (!api) return;
  //  loop through default strapi routes file and custom routes files
  for (let route_file_name in api.routes) {
    const route_file = api.routes[route_file_name];
    let route = route_file.routes.find(
      (r) =>
        r.handler === `api::${apiName}.${controller}.${action}` ||
        r.handler === `${controller}.${action}`
    );
    if (route) return route;
  }
};

const getTestContent = (route) => {
  const get_test_body = `
    const res = await makeTestRequest({ route:'${route.path}', method: "GET" })
    `;
  const post_test_body = `
    const res = await makeTestRequest({ route:'${route.path}', method: "POST", input:{}, token })
    `;
  const put_test_body = `
    const res = await makeTestRequest({ route:'${route.path}', method: "PUT", input:{}})
    `;
  const delete_test_body = `
    const res = await makeTestRequest({ route:'${route.path}', method: "DELETE", token })
    `;

  const test_body = {
    GET: get_test_body,
    POST: post_test_body,
    PUT: put_test_body,
    DELETE: delete_test_body,
  };

  return `
const makeTestRequest = require("./helpers/makeTestRequest");
const { createTestUser } = require("./helpers/data");

describe('@${route.method}:${route.path}', () => {
	it('should something successfully', async () => {
        const testUser = await createTestUser();
        ${test_body[route.method]}
        expect(res.status).toBe(200)
	});
});


`;
};
