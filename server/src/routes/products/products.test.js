const request = require('supertest');
const app = require('../../app');

describe('Products API', () => {
  beforeAll(async () => {
    await require('../../services/postgres').postgresConnection();
    await require('../../services/postgres').sequelize.sync({ force: true });
  });
  describe('Test GET /products', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
