import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Article, Comment } from '@prisma/client';

const prisma = new PrismaClient();
const APP_SECRET = 'your-app-secret';

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await prisma.user.findMany();
    },
    articles: async (): Promise<Article[]> => {
      return await prisma.article.findMany();
    },
    article: async (_: unknown, { id }: { id: number }): Promise<Article | null> => {
      return await prisma.article.findUnique({ where: { id: Number(id) } });
    },
  },
  Mutation: {
    signUp: async (_: unknown, { username, email, password }: { username: string; email: string; password: string }): Promise<User> => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
    },
    login: async (_: unknown, { email, password }: { email: string; password: string }): Promise<string> => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      return jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '1h' });
    },
    createArticle: async (_: unknown, { title, content }: { title: string; content: string }, { userId }: { userId: number | null }): Promise<Article> => {
      if (!userId) throw new Error('Authentication required');
      return await prisma.article.create({
        data: { title, content, authorId: userId },
      });
    },
    createComment: async (_: unknown, { articleId, content }: { articleId: number; content: string }, { userId }: { userId: number | null }): Promise<Comment> => {
      if (!userId) throw new Error('Authentication required');
      return await prisma.comment.create({
        data: { content, articleId: Number(articleId), authorId: userId },
      });
    },
    likeArticle: async (_: unknown, { articleId }: { articleId: number }, { userId }: { userId: number | null }): Promise<Article> => {
      if (!userId) throw new Error('Authentication required');
      await prisma.like.create({
        data: { articleId: Number(articleId), userId },
      });
      const article = await prisma.article.update({
        where: { id: Number(articleId) },
        data: { likesCount: { increment: 1 } },
      });
      return article;
    },
  },
  User: {
    articles: async (parent: User): Promise<Article[]> => {
      return await prisma.article.findMany({ where: { authorId: parent.id } });
    },
  },
  Article: {
    author: async (parent: Article): Promise<User | null> => {
      return await prisma.user.findUnique({ where: { id: parent.authorId } });
    },
    comments: async (parent: Article): Promise<Comment[]> => {
      return await prisma.comment.findMany({ where: { articleId: parent.id } });
    },
    likes: async (parent: Article): Promise<number> => {
      return parent.likesCount;
    },
  },
  Comment: {
    author: async (parent: Comment): Promise<User | null> => {
      return await prisma.user.findUnique({ where: { id: parent.authorId } });
    },
    article: async (parent: Comment): Promise<Article | null> => {
      return await prisma.article.findUnique({ where: { id: parent.articleId } });
    },
  },
};

export { resolvers };
