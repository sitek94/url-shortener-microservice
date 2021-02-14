import { validateUrl } from '../src/util/validate-url';

describe('validateUrl function', () => {
  it(`throws when called with empty string`, async () => {
    try {
      await validateUrl('');
    } catch (e) {
      expect(e.message).toMatch(/invalid url/i);
    }
  });

  it(`throws when called with a string that doesn't start with "http(s)"`, async () => {
    try {
      await validateUrl('www.maciek.com');
    } catch (e) {
      expect(e.message).toMatch(/invalid url/i);
    }
  });

  it(`throws when called with the site's URL`, async () => {
    try {
      await validateUrl('https://url-shortener.com');
    } catch (e) {
      expect(e.message).toMatch(/invalid url/i);
    }
  });

  it(`throws when called with localhost URL`, async () => {
    try {
      await validateUrl('http://localhost:5000');
    } catch (e) {
      expect(e.message).toMatch(/invalid url/i);
    }
  });

  it(`throws on dns lookup failure`, async () => {
    try {
      await validateUrl('https://incorrect-hostname.com');
    } catch (e) {
      expect(e.message).toMatch(/invalid url/i);
    }
  });
});
