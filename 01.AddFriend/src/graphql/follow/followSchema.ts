import { gql } from 'apollo-server-express';

const followSchema = gql`
  extend type Query {
    getFollowers(id: ID!): [Follow]!
    getFollowing(id: ID!): [Follow]!
  }

  extend type Mutation {
    setFollowing(id: ID!): Follow!
    deleteFollowing(id: ID!): Follow!
    deleteFollower(id: ID!): Follow!
    checkFollower(id: ID!): Follow!
  }

  type Follow {
    id: ID!
    following: User!
    follower: User!
    checked: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

export { followSchema };
