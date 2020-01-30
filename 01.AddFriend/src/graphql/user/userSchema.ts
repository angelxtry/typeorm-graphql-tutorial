import { gql } from 'apollo-server-express';

const userSchema = gql`
  extend type Query {
    signin(email: String!, password: String!): AuthPayload!
    me: User!
    user(id: ID!): User!
    users: [User]!
  }

  extend type Mutation {
    signup(input: signupInput): AuthPayload!
  }

  type User {
    id: ID!
    email: String!
    nickname: String!
    following: [Follow]!
    followers: [Follow]!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input signupInput {
    email: String!
    password: String!
    nickname: String!
  }
`;

export { userSchema };
