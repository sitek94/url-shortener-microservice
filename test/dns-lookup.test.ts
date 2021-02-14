import { dnsLookup } from '../src/util/dns-lookup';

describe('dnsLookup', () => {
  it('handles valid input', async () => {
    const res = await dnsLookup('www.google.com');

    expect(res).toBeTruthy();
  });

  it('handles invalid input', async () => {
    try {
      await dnsLookup('asdfdfasf');
    } catch (e) {
      expect(e.message).toMatch(/dns lookup failed/i);
    }
  });
});
