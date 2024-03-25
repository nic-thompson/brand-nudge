const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const productsDatabase = require('./products.postgres');

function loadProducts() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'products.csv')
    )
      .pipe(
        parse({
          relax_column_count: true,
          trim: true,
          from_line: 2,
          skip_empty_lines: true,
        })
      )
      .on('data', (data) => {
        createProductIfNotExists(data);
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        resolve();
      });
  });
}

async function createProductIfNotExists(product) {
  try {
    const [createdProduct, created] = await productsDatabase.findOrCreate({
      where: { ean: product[2] },
      defaults: {
        date: product[0],
        retailer: product[1],
        ean: product[2],
        category: product[3],
        manufacturer: product[4],
        brand: product[5],
        product_title: product[6],
        image_url: product[7],
        on_promotion: product[8],
        promotion_description: product[9],
        base_price: product[10],
        shelf_price: product[11],
        promoted_price: product[12],
      },
    });

    if (created) {
      console.log(`Product ${createdProduct.product_title} created!`);
    } else {
      console.log(`Product ${createdProduct.product_title} already exists!`);
    }
  } catch (error) {
    console.error('Error creating or finding product.', error);
  }
}

async function getAllProducts() {
  try {
    return await productsDatabase.findAll();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

module.exports = {
  loadProducts,
  getAllProducts,
};
