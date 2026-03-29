const request = require("supertest");

/**
 *
 * @param {string} method
 * @param {object} input
 * @param {string?} token
 * @returns {Promise<import("supertest").Response>}
 */
const makeTestRequest = ({ route, method = "GET", input, token }) => {
  let req = request(strapi.server.httpServer);

  if (method === "GET") req = req.get(route).query(input);
  if (method === "POST") req = req.post(route).send(input);

  return req
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token ?? testApiToken}`);
};

module.exports = makeTestRequest;
