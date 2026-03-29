const request = require("supertest");

const makeRequest = (input) => {
  return request(strapi.server.httpServer)
    .post("/api/create-health-records")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${testApiToken}`)
    .send(input);
};

describe("createHealthRecords", () => {
  it("should create health record successfully", async () => {
    // we need to create national record and phone record first
    const test_national_no = "412345";
    const testPhone = "911231234";
    const testCODE = "TESTCODE";
    // first we need to create phone code
    await strapi.db.query("api::phone.phone").create({
      select: ["code"],
      data: {
        number: testPhone,
        code: testCODE,
        validity: Date.now() + 3 * 60 * 1000, // 3 minutes
      },
    });

    const { id: nationalRecordID } = await strapi.entityService.create(
      "api::national-record.national-record",
      {
        data: {
          national_no: test_national_no,
          phone: testPhone,
        },
      }
    );

    const { id: city } = await strapi.db.query("api::city.city").create({
      select: ["id"],
      data: {
        name: "test city",
      },
    });
    const { id: center } = await strapi.db.query("api::center.center").create({
      select: ["id"],
      data: {
        name: "test center",
      },
    });

    const response = await makeRequest({
      nationalRecordID: nationalRecordID,
      city,
      center,
      code: testCODE,
    });

    expect(response.status).toBe(200);
    expect(response.body[0].health_no.length).toBe(8);

    //   clean tables
    await strapi.db.query("api::phone.phone").deleteMany({});
    await strapi.db.query("api::citizen.citizen").deleteMany({});
    await strapi.db
      .query("api::national-record.national-record")
      .deleteMany({});
  });
});
