import { gql } from 'apollo-server-express';

const mutationSchema = gql`
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, author: ID!): Post
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }
`;

export default mutationSchema;
