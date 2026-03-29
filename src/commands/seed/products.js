module.exports = async () => {
  // create many categories
  const test_categories = [
    { name: "laptops" },
    { name: "apple" },
    { name: "microsoft" },
    { name: "monitors" },
    { name: "asus" },
    { name: "samsung" },
    { name: "phones" },
    { name: "oneplus" },
  ];
  const [laptops, apple, microsoft, monitors, asus, samsung, phones, oneplus] =
    await Promise.all(
      test_categories.map(async (cat) => {
        return strapi.db.query("api::category.category").create({
          data: cat,
        });
      })
    );

  // create many products and link them to categories
  const test_products = [
    { name: "mac-air m2", categories: [laptops.id, apple.id] },
    { name: "samsung monitor 27'", categories: [monitors.id, samsung.id] },
    { name: "iPhone X'", categories: [apple.id, phones.id] },
  ];

  const [mac, monitor, iphone] = await Promise.all(
    test_products.map(async (product) => {
      return strapi.db.query("api::product.product").create({
        data: product,
      });
    })
  );

  // create many variations and link to product
  const test_variations = [
    { name: "mac-air 128gb", product: mac.id },
    { name: "mac-air 256gb", product: mac.id },
    { name: "mac-air 516gb", product: mac.id },
    // iphone
    { name: "iPhone X 16gb", product: iphone.id },
    { name: "iPhone X 32gb", product: iphone.id },
    { name: "iPhone X 64gb", product: iphone.id },
    { name: "iPhone X 128gb", product: iphone.id },
  ];

  await Promise.all(
    test_variations.map(async (cat) => {
      return strapi.db.query("api::variation.variation").create({
        data: cat,
      });
    })
  );
};
