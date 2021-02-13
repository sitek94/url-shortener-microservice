import { validateUrl } from '../src/util/validate-url';

describe('urlValidator', () => {
  it('throws when called with empty string', async () => {
    expect(validateUrl('')).rejects.toThrow();
  });

  it(`throws when url doesn't start with "http(s)"`, async () => {
    expect(validateUrl('www.maciek.com')).rejects.toThrow();
  });

  it(`throws on dns lookup failure`, async () => {
    expect(validateUrl('https://incorrect-hostname.com')).rejects.toThrow();
  });
});
