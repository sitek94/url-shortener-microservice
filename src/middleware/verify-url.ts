import dns from 'dns';
import { Request, Response, NextFunction } from 'express';

function verifyUrlMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const url = req.body.url;

    // Empty url
    if (url === '') {
      throw Error('Invalid URL');
    }

    // Doesn't start with http(s)::
    if (!/^https?/.test(url)) {
      throw Error('Invalid URL');
    }

    const { hostname } = new URL(url);

    dns.lookup(hostname, (err) => {
      if (err) {
        throw new Error('Invalid URL');
      }

      next();
    });
  } catch (e) {
    res.json({ error: e.message });
  }
}

export default verifyUrlMiddleware;
