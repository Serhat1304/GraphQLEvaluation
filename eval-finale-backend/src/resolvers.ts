import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Article, Comment } from '@prisma/client';
import { DataSourceContext } from './context';

const prisma = new PrismaClient();
const APP_SECRET = 'your-app-secret';

interface SignUpArgs {
  username: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface CreateArticleArgs {
  title: string;
  content: string;
}

interface CreateCommentArgs {
  articleId: number;
  content: string;
}

interface LikeArticleArgs {
  articleId: number;
}

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await prisma.user.findMany();
    },
    articles: async (): Promise<Article[]> => {
      return await prisma.article.findMany();
    },
    article: async (_: {}, { id }: { id: number }): Promise<Article | null> => {
      return await prisma.article.findUnique({ where: { id: Number(id) } });
    },
  },
  Mutation: {
    signUp: async (_: {}, args: SignUpArgs): Promise<User> => {
      const { username, email, password } = args;
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
    },
    login: async (_: {}, args: LoginArgs): Promise<string> => {
      const { email, password } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      return jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: '1h' });
    },
    createArticle: async (_: {}, args: CreateArticleArgs, context: DataSourceContext): Promise<Article> => {
      const { title, content } = args;
      const { userId } = context;
      if (!userId) throw new Error('Authentication required');
      return await prisma.article.create({
        data: { title, content, authorId: userId },
      });
    },
    createComment: async (_: {}, args: CreateCommentArgs, context: DataSourceContext): Promise<Comment> => {
      const { articleId, content } = args;
      const { userId } = context;
      if (!userId) throw new Error('Authentication required');
      return await prisma.comment.create({
        data: { content, articleId: Number(articleId), authorId: userId },
      });
    },
    likeArticle: async (_: {}, args: LikeArticleArgs, context: DataSourceContext): Promise<Article> => {
      const { articleId } = args;
      const { userId } = context;
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
