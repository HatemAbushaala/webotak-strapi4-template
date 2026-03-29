const request = require("supertest");
const { getUserByNationalNumber } = require("../../src/lib/nationalNumbers");

const makeRequest = (input) => {
  return request(strapi.server.httpServer)
    .post("/api/get-national-info")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${testApiToken}`)
    .send(input);
};
describe("getNationalInfo", () => {
  // here we will test with users not exists in database
  describe("New User", () => {
    it("should send sms message", async () => {
      const testPhone = "911201234";
      // no need to setup anything but we need to get national numbers from nationalNumbers.js file
      const response = await makeRequest({
        national_no: "12345",
        phone: testPhone,
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("sms code sent");

      // make sure that phone code record is created
      const entry = await strapi.db.query("api::phone.phone").findOne({
        select: ["number"],
        where: { number: testPhone },
      });
      expect(entry.number).toBe(testPhone);

      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });

    it("should return user info", async () => {
      const test_national_no = "12345";
      const testPhone = "911201234";
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

      const response = await makeRequest({
        national_no: test_national_no,
        phone: testPhone,
        code: testCODE,
      });
      expect(response.status).toBe(200);
      expect(response.body.full_name).toBe(
        getUserByNationalNumber(test_national_no).full_name
      );
      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });
    it("should return phone mismatch error message", async () => {
      const response = await makeRequest({
        national_no: "12345",
        phone: "3289572375", // invalid phone
      });
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe(
        "رقم الهاتف غير مسجل مع الرقم الوطني هذا"
      );
    });
    it("should return invalid code error message", async () => {
      const test_national_no = "12345";
      const testPhone = "911201234";

      const response = await makeRequest({
        national_no: test_national_no,
        phone: testPhone,
        code: "WRONG-CODE",
      });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("رمز التحقق غير صحيح");
    });
    it("should return code expired error message", async () => {
      const test_national_no = "12345";
      const testPhone = "911201234";
      const testCODE = "TESTCODE";
      // first we need to create phone code
      await strapi.db.query("api::phone.phone").create({
        select: ["code"],
        data: {
          number: testPhone,
          code: testCODE,
          validity: Date.now() - 3 * 60 * 1000, // expired before 3 minutes
        },
      });
      const response = await makeRequest({
        national_no: test_national_no,
        phone: testPhone,
        code: testCODE,
      });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("رمز التحقق منتهي الصلاحية");

      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });
  });

  //   // here we will test with users exists in database
  describe("Existing User", () => {
    const test_national_no = "212345";
    const test_phone_no = "911211234";
    let db_existing_user;
    // prepare user that we will use in our tests
    beforeAll(async () => {
      db_existing_user = await strapi.entityService.create(
        "api::citizen.citizen",
        {
          data: {
            health_no: "H5600506",
            national_no: test_national_no,
            phone: test_phone_no,
            first_name: "hatem",
            last_name: "ahmed",
            full_name: "hatem ahmed",
            //   other data is not import for our tests
          },
        }
      );
    });

    it("should return user info", async () => {
      const testCODE = "TESTCODE";
      // first we need to create phone code
      await strapi.db.query("api::phone.phone").create({
        select: ["code"],
        data: {
          number: test_phone_no,
          code: testCODE,
          validity: Date.now() + 3 * 60 * 1000, // 3 minutes
        },
      });

      const response = await makeRequest({
        national_no: test_national_no,
        phone: test_phone_no,
        code: testCODE,
      });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(db_existing_user.id);

      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });
    it("should send message", async () => {
      const response = await makeRequest({
        national_no: test_national_no,
        phone: test_phone_no,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("sms code sent");

      // make sure that phone code record is created
      const entry = await strapi.db.query("api::phone.phone").findOne({
        select: ["number"],
        where: { number: test_phone_no },
      });
      expect(entry.number).toBe(test_phone_no);

      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });
    it("should return invalid code error message", async () => {
      const response = await makeRequest({
        national_no: test_national_no,
        phone: test_phone_no,
        code: "WRONG-CODE",
      });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("رمز التحقق غير صحيح");
    });
    it("should return code expired error message", async () => {
      const testCODE = "TESTCODE";
      // first we need to create phone code
      await strapi.db.query("api::phone.phone").create({
        select: ["code"],
        data: {
          number: test_phone_no,
          code: testCODE,
          validity: Date.now() - 3 * 60 * 1000, // expired before 3 minutes
        },
      });
      const response = await makeRequest({
        national_no: test_national_no,
        phone: test_phone_no,
        code: testCODE,
      });

      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe("رمز التحقق منتهي الصلاحية");

      //   clean phone table
      await strapi.db.query("api::phone.phone").deleteMany({});
    });
    it("should return phone mismatch error message", async () => {
      const response = await makeRequest({
        national_no: test_national_no,
        phone: "3289572375", // invalid phone
      });
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe(
        "رقم الهاتف غير مسجل مع الرقم الوطني هذا"
      );
    });
  });

  describe("Invalid User", () => {
    it("return invalid national number message", async () => {
      const response = await makeRequest({
        national_no: "234234234234",
        phone: "82394523",
      });
      expect(response.status).toBe(400);
      expect(response.body.error.message).toBe(
        "لم يتم العثور علي الرقم الوطني الذي تم ادخاله"
      );
    });
  });
});
