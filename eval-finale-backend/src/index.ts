import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { DataSourceContext, prisma } from './context';
import { verify } from 'jsonwebtoken';
import { APP_SECRET } from './auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): DataSourceContext => {
    const token = req.headers.authorization || '';
    let userId: number | null = null;
    try {
      if (token) {
        const decodedToken = verify(token, APP_SECRET) as { userId: number };
        userId = decodedToken.userId;
      }
    } catch (err) {
      console.error(err);
    }
    return { prisma, userId };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
