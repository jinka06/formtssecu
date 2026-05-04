import express, { Express, Request, Response } from 'express';
import authRoutes from './routes/auth.js';
import rateLimit from 'express-rate-limit';

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
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
