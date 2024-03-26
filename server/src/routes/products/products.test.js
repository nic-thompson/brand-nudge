const request = require('supertest');
const app = require('../../app');

describe('Test GET /products', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
      .get('/products')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
