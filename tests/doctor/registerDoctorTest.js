const request = require("supertest");

const makeRequest = (input) => {
  return request(strapi.server.httpServer)
    .post("/api/register-doctor")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${testApiToken}`)
    .send(input);
};

describe("registerDoctor", () => {
  let center;
  beforeAll(async () => {
    center = await strapi.db.query("api::center.center").create({
      select: ["id"],
      data: {
        name: "test center",
      },
    });
  });
  it("should create new doctor successfully", async () => {
    const test_national_no = "320984203";
    const response = await makeRequest({
      center: center.id,
      national_no: test_national_no,
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.national_no).toBe(test_national_no);

    // cleanup
    await strapi.db.query("api::doctor.doctor").deleteMany();
  });
  it("should add doctor to center if already exists", async () => {
    const test_national_no = "320984203";

    await strapi.db.query("api::doctor.doctor").create({
      data: {
        national_no: test_national_no,
        centers: [center],
      },
    });

    const newCenter = await strapi.db.query("api::center.center").create({
      select: ["id"],
      data: {
        name: "new test center",
      },
    });
    const response = await makeRequest({
      center: newCenter.id,
      national_no: test_national_no,
    });
    expect(response.status).toBe(200);
    expect(response.body.national_no).toBe(test_national_no);

    // we will make query just to check that record saved correctly and new center is added to it
    const doctor = await strapi.db.query("api::doctor.doctor").findOne({
      select: ["*"],
      where: {
        national_no: test_national_no,
      },
      populate: ["centers"],
    });

    expect(doctor.centers.length).toBe(2);
    // cleanup
    await strapi.db.query("api::doctor.doctor").deleteMany();
  });
});
