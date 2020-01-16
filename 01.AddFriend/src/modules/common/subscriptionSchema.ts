import { gql } from 'apollo-server-express';

const subscriptionSchema = gql`
  type Subscription {
    comment(postId: ID!): Comment!
  }
`;

export default subscriptionSchema;
