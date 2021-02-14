import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';

afterAll(() => {
  mongoose.connection.db.dropDatabase();
});

describe('validateUrl', () => {
  it('catches invalid URL', async () => {
    const res = await request(app).post('/api/shorturl/new').send({
      url: 'afdsasfas',
    });

    expect(res.body.error).toMatch(/invalid url/i);
  });

  it('lets valid URL through', async () => {
    const res = await request(app).post('/api/shorturl/new').send({
      url: 'https://google.com',
    });

    expect(res.status).toBe(200);
    expect(res.body.short_url).toBeTruthy();
  });
});
