import request from 'supertest';
import server from '../server';

describe('GET /api', () => {
  it('should send back a JSON response', async () => {
    const response = await request(server).get('/api');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.message).toBe('Welcome to the API');
    expect(response.status).not.toBe(404);
    expect(response.body.message).not.toBe('well to the API');
  });
});

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);
    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('should validate that the price is a number and greater than zero', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Product 1',
      price: 'Hola',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);
    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it('Sould create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Product 1',
      price: 10,
    });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.name).toBe('Product 1');
    expect(response.body.data.price).toBe(10);
    expect(response.body.data.availability).toBe(true);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty('error');
  });
});
