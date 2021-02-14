import { dnsLookup } from './dns-lookup';

export async function validateUrl(url: any) {
  try {
    if (typeof url !== 'string' || url === '' || !/^https?/.test(url)) {
      throw new Error();
    }

    const { hostname } = new URL(url);

    if (hostname === process.env.HOSTNAME || hostname === 'localhost') {
      throw new Error();
    }

    await dnsLookup(hostname);
  } catch {
    throw new Error('Invalid URL');
  }
}
