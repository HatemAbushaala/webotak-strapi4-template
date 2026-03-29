async function handler() {
  console.time("product")
  for (let i = 0; i < 1000000; i++) {
    await strapi.db.query("api::product.product").create({
      data: {
        name: `product-${i}`,
      },
    })
  }
  console.timeEnd("product")
}

module.exports = handler
