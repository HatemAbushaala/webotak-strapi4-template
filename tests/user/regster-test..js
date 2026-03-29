const request = require("supertest");
const { randomUUID } = require("crypto");

describe("register", () => {
  it("should register as client", async () => {
    let randomName = randomUUID();
    let email = randomName + "@gmail.com";

    await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
      .post("/api/auth/local/register")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        email: email,
        firstName: "test",
        lastName: "client",
        password: "12345678",
        user_type: "authenticated",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
        expect(data.body.user.firstName).toBe("test");
        expect(data.body.user.lastName).toBe("client");
        expect(data.body.user.email).toBe(email);
        expect(data.body.user.username).toBe(
          `test_${1000 + data.body.user.id}`
        );
      });
  });
  it("should register as vendor", async () => {
    let randomName = randomUUID();
    let email = randomName + "@gmail.com";

    await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
      .post("/api/auth/local/register")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        email: email,
        firstName: "test",
        lastName: "vendor",
        username: randomName,
        password: "12345678",
        user_type: "vendor",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
        expect(data.body.user.firstName).toBe("test");
        expect(data.body.user.lastName).toBe("vendor");
        expect(data.body.user.email).toBe(email);
        expect(data.body.user.username).toBe(
          `test_${1000 + data.body.user.id}`
        );
      });
  });
});
