const http = require('http');

const app = require('./app');

const { loadProducts } = require('./models/products.model');
const { postgresConnection } = require('./services/postgres');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await postgresConnection();
  await loadProducts();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
