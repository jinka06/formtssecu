// backend/types/express.d.ts
import 'express-rate-limit';

declare global {
  namespace Express {
    interface Request {
      validatedData?: import('./index.js').RegisterRequest;
    }
  }
}

export {};
