import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]!
    comments: [Comment]!
  }
`;

export { userSchema };
