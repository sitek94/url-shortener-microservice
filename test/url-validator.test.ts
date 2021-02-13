import request from 'supertest';
import app from '../src/app';
import { urlValidator } from '../src/middleware/url-validator';

describe('validateUrl', () => {
  it('catches invalid URL', async () => {
    try {
      await request(app).post('/api/shorturl/new').send({
        url: 'asdfasfda',
      });
    } catch (e) {
      expect(e).toBeTruthy();
      expect(urlValidator).toHaveBeenCalled();
    }
  });
});
