import { ApolloError } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';
import { users, posts, comments } from '../../fakeData';

const postResolvers = {
  Query: {
    post: (_: any, args: any) => posts.find((post) => post.id === args.id),
    posts: () => posts,
  },
  Post: {
    author: (parent: any) => {
      console.log('Parent: ', parent);
      console.log('Author id: ', parent.author);
      return users.find((user) => user.id === parent.author);
    },
    comments: (post: any) =>
      comments.filter((comment) => comment.post === post.id),
  },
  Mutation: {
    createPost: (_: any, args: any) => {
      const isExistUser = users.some((user) => user.id === args.author);
      if (!isExistUser) {
        throw new ApolloError('User not exist', 'USER_NOT_EXIST');
      }
      const post = {
        id: uuidv4(),
        title: args.title,
        author: args.author,
      };
      posts.push(post);
      return post;
    },
  },
};

export { postResolvers };
