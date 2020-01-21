import { gql } from 'apollo-server-express';
import { userResolver, userSchema } from './user';
import { followResolver, followSchema } from './follow';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const schemas = [linkSchema, userSchema, followSchema];

const resolvers = [userResolver, followResolver];


export { resolvers, schemas };
