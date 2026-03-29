const { getDateAfterDays } = require("../../helpers/dateUtils");

module.exports = async () => {
  // create many categories
  // i used parse to send the date utc, if i just send the string it will be used as localtime
  const test_orders = [
    // 2023-11-06 = 100
    { amount: 100, createdAt: Date.parse("2023-11-06") },
    // "2023-11-04" = 300
    { amount: 150, createdAt: Date.parse("2023-11-04") },
    { amount: 150, createdAt: Date.parse("2023-11-04") },
    // 2023-10-30 = 450
    { amount: 120, createdAt: Date.parse("2023-10-30") },
    { amount: 180, createdAt: Date.parse("2023-10-30") },
    { amount: 150, createdAt: Date.parse("2023-10-30") },
    // "2023-10-23" = 140
    { amount: 140, createdAt: Date.parse("2023-10-23") },
  ];
  const orders = await Promise.all(
    test_orders.map(async (order) => {
      return strapi.db.query("api::order.order").create({
        data: order,
      });
    })
  );
};
