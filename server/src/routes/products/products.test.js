const request = require('supertest');
const app = require('../../app');

describe('Products API', () => {
  beforeAll(async () => {
    await require('../../services/postgres').postgresConnection();
  });
  afterAll(async () => {
    await require('../../services/postgres').sequelize.close();
  });
  describe('Test GET /products', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/products')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
