import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error);
    }
  };
