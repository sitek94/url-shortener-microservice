import { Request, Response, NextFunction } from 'express';
import { validateUrl } from '../util/validate-url';

export async function urlValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await validateUrl(req.body.url);
    next();
  } catch (err) {
    next(err);
  }
}
