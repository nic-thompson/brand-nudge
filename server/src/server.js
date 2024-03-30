const fs = require('fs');
const path = require('path');
const https = require('https');

const app = require('./app');

const { loadProducts } = require('./models/products.model');
const { postgresConnection, sequelize } = require('./services/postgres');

const PORT = process.env.PORT || 8000;

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  },
  app
);

async function startServer() {
  await postgresConnection();
  await sequelize.sync({ force: true });

  if (process.env.POPULATE_DB === 'true') {
    console.log('Loading products...');
    await loadProducts();
  }

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
