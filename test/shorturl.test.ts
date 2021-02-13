import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import { Item } from '../src/models/item-model';

afterAll(() => {
  mongoose.connection.db.dropDatabase();
});

describe('/api/shorturl', () => {
  describe('POST /new', () => {
    it('adds the initial item into the db', async () => {
      const res = await request(app).post('/api/shorturl/new').send({
        url: 'https://test.com/1',
      });

      expect(res.status).toBe(200);
      expect(res.body.original_url).toBe('https://test.com/1');
      expect(res.body.short_url).toBe(1);
    });

    it('adds the subsequent item into the db', async () => {
      const res = await request(app).post('/api/shorturl/new').send({
        url: 'https://test.com/2',
      });

      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
      expect(res.body.original_url).toBe('https://test.com/2');
      expect(res.body.short_url).toBe(2);
    });

    it('returns error message when MongoDB fails to save the item', async () => {
      jest
        .spyOn(Item.prototype, 'save')
        .mockImplementationOnce(() => Promise.reject(new Error('test')));

      const res = await request(app).post('/api/shorturl/new').send({
        url: 'https://test.com/failed-to-save-the-item',
      });

      expect(res.status).toBe(200);
      expect(res.body.error).toMatch(/test/i);
    });

    it('returns existing item if URL is already in the db', async () => {
      const res = await request(app).post('/api/shorturl/new').send({
        url: 'https://test.com/1',
      });

      expect(res.status).toBe(200);
      expect(res.body.original_url).toBe('https://test.com/1');
      expect(res.body.short_url).toBe(1);
    });
  });

  describe('GET /:short_url', () => {
    it(`returns { error: "Wrong format" } for strings`, async () => {
      const res = await request(app).get('/api/shorturl/string-url');

      expect(res.body.error).toMatch(/wrong format/i);
    });

    it(`returns { error: "Wrong format" } for zero`, async () => {
      const res = await request(app).get('/api/shorturl/0');

      expect(res.body.error).toMatch(/wrong format/i);
    });

    it(`redirects to original_url if short_url exists in the db`, async () => {
      const res = await request(app).get('/api/shorturl/1');

      expect(res.status).toBe(302);
      expect(res.headers['location']).toBe('https://test.com/1');
    });

    it(`informs that the short_url was not found in the db`, async () => {
      const res = await request(app).get('/api/shorturl/999');

      expect(res.body.error).toBe('No short URL found for the given input');
    });
  });
});
