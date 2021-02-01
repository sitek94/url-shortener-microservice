import dns from 'dns';
import express from 'express';

function verifyUrlMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const url = req.body.url;
    // Empty url
    if (url === '') {
      throw Error('Invalid URL');
    }

    // Doesn't start with http(s)::
    if (!(/^https?::/.test(url))) {
      throw Error('Invalid URL');
    }

    const { hostname } = new URL(url);

    dns.lookup(hostname, (err) => {
      if (err) {
        console.log(err);
      }

      next();
    });
  } catch (e) {
    res.json({ error: 'Invalid URL' });
  }
}

export default verifyUrlMiddleware;
