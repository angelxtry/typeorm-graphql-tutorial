import { gql } from 'apollo-server-express';

const commentSchema = gql`
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

export { commentSchema };
