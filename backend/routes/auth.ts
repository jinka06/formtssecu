import { Router, Request, Response } from 'express';
import {
  getMockUserCount,
  getMockUsers,
  addMockUser,
} from '../utils/mockDb.js';
import { validate } from '../middleware/validate.js';
import { registerSchema } from '../schemas/registerSchema.js';
import type { RegisterRequest } from '../types/index.js';

const authRoutes = Router();

authRoutes.get('/user-count', (req: Request, res: Response) => {
  res.status(200).json({ mockUserCount: getMockUserCount() });
});

authRoutes.get('/users', (req: Request, res: Response) => {
  res.status(200).json({ users: getMockUsers() });
});

authRoutes.post('/login', (req: Request, res: Response) => {
  const { name, email, age, username, password, bio } = req.body;
  if (!name || !email || !age || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  addMockUser({ name, email, age, username, bio });
  return res.status(201).json({
    message: 'Login successful.',
    mockUserCount: getMockUserCount(),
  });
});

authRoutes.post(
  '/register',
  validate(registerSchema),
  (req: Request, res: Response) => {
    const userData: RegisterRequest = req.validatedData!;
    addMockUser(userData);
    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: {
        id: getMockUserCount(),
        username: userData.username,
        email: userData.email,
        name: userData.name,
      },
      mockUserCount: getMockUserCount(),
    });
  }
);

export default authRoutes;
