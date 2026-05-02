// backend/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      validatedData?: import('./index.js').RegisterRequest;
    }
  }
}

export {};
