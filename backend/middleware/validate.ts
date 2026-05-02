import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { RegisterRequest } from '../types/index.js';

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map(err => ({
        field: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ success: false, errors });
    }
    req.validatedData = result.data as RegisterRequest;
    next();
  };
}

export default validate;
