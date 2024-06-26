import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

export const prisma = new PrismaClient();
const APP_SECRET = 'your-app-secret';

export interface DataSourceContext {
  prisma: PrismaClient;
  userId: number | null;
}

export const context = ({ req }: { req: Request }): DataSourceContext => {
  const token = req.headers.authorization || '';
  let userId: number | null = null;
  if (token) {
    try {
      const payload = verify(token.replace('Bearer ', ''), APP_SECRET);
      userId = (payload as { userId: number }).userId;
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'TokenExpiredError') {
          console.warn('Token expired:', e.message);
        } else {
          console.error('Token verification error:', e.message);
        }
      }
    }
  }
  return { prisma, userId };
};
