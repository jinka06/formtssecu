import { Router, Request, Response } from 'express';
import {
  getMockUserCount,
  getMockUsers,
  addMockUser,
} from '../utils/mockDb.js';

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
  return res.status(200).json({
    message: 'Registration successful.',
    mockUserCount: getMockUserCount(),
  });
});

export default authRoutes;
