import { gql } from 'apollo-server-express';

const querySchema = gql`
  type Query {
    user(id: ID!): User!
    users: [User]!
    post(id: ID!): Post!
    posts: [Post]!
    comment(id: ID!): [Comment]!
    comments: [Comment]!
  }
`;

export default querySchema;
