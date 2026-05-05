import express, { Express, Request, Response } from 'express';
import authRoutes from './routes/auth.js';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
  keyGenerator: (req: Request) => ipKeyGenerator(req.ip ?? 'unknown'),
});

export const speedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 10,
  delayMs: 500,
  keyGenerator: (req: Request) => ipKeyGenerator(req.ip ?? 'unknown'),
});

app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api', authRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
