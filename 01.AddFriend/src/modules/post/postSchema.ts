import { gql } from 'apollo-server-express';

const postSchema = gql`
  type Post {
    id: ID!
    title: String!
    author: User!
    comments: [Comment]!
  }
`;

export { postSchema };
