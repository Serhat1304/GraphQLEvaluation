import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const APP_SECRET = 'your-app-secret';

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function decodeAuthHeader(authHeader: string): { userId: number } {
  const token = authHeader.replace('Bearer ', '');
  if (!token) throw new Error('No token found');
  
  const decoded = jwt.verify(token, APP_SECRET);
  return decoded as { userId: number };
}
