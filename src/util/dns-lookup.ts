import dns from 'dns';

export async function dnsLookup(hostname: string) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err) => {
      if (err) {
        reject(new Error('DNS lookup failed'));
      } else {
        resolve('ok');
      }
    });
  });
}
