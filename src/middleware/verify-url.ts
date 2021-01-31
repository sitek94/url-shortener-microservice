import dns from 'dns';
import express from 'express';

function verifyUrlMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { hostname } = new URL(req.body.url);

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
