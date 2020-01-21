import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schemas, resolvers } from './graphql';
import connectDB from './repository';

export const startServer = async () => {
  try {
    await connectDB();
    const PORT = 9999;
    const app = express();

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
    });

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error(error);
  }
};
