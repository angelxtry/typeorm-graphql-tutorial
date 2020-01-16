import uuidv4 from 'uuid/v4';
import { ApolloError, PubSub } from 'apollo-server-express';
import { comments, users, posts } from '../../fakeData';

interface PubSubContext {
  pubsub: PubSub;
}

const commentResolvers = {
  Query: {
    comment: (_: any, args: any) =>
      comments.find((comment) => comment.id === args.id),
    comments: () => comments,
  },
  Comment: {
    author: (comment: any) => users.find((user) => user.id === comment.author),
    post: (comment: any) => posts.find((post) => post.id === comment.post),
  },
  Mutation: {
    createComment: (_: any, args: any, context: PubSubContext) => {
      const isExistUser = users.some((user) => user.id === args.data.author);
      if (!isExistUser) {
        throw new ApolloError('User not exist', 'USER_NOT_EXIST');
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      comments.push(comment);

      const { pubsub } = context;
      pubsub.publish(`comment ${args.data.post}`, { comment });

      return comment;
    },
  },
  Subscription: {
    comment: {
      subscribe(_: any, args: any, context: PubSubContext) {
        const post = posts.find((p) => p.id === args.postId);
        if (!post) {
          throw new ApolloError('Post not exist', 'POST_NOT_EXIST');
        }
        const { pubsub } = context;
        return pubsub.asyncIterator(`comment ${args.postId}`);
      },
    },
  },
};

export { commentResolvers };
