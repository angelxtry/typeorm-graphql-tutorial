import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import schemas from './schemas';
import connectDB from './repository';

export const startServer = async () => {
  try {
    await connectDB();
    const PORT = 9999;
    const app = express();

    const schema: GraphQLSchema = makeExecutableSchema({
      typeDefs: schemas,
      resolvers,
    });

    const server = new ApolloServer({
      schema,
    });

    server.applyMiddleware({ app, cors: false });

    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error(error);
  }
};
