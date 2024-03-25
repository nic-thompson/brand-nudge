const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const products = [];

function loadProducts() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'products.csv')
    )
      .pipe(parse({ relax_column_count: true }))
      .on('data', (data) => {
        products.push(data);
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(products);
        console.log(`${products.length} products found!`);
        resolve(products);
      });
  });
}

module.exports = {
  loadProducts,
};
