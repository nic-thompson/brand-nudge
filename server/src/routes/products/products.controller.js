const { getAllProducts } = require('../../models/products.model');

async function httpGetAllProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  httpGetAllProducts,
};
