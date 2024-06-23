import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { context } from './context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
