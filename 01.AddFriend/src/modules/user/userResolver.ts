import { ApolloError } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';
import { users, posts, comments } from '../../fakeData';

const userResolver = {
  Query: {
    user: (_: any, args: any) => {
      console.log(args.id);
      return users.find((user) => user.id === args.id);
    },
    users: () => {
      console.log(users);
      return users;
    },
  },
  User: {
    posts: (user: any) => posts.filter((post) => post.author === user.id),
    comments: (user: any) =>
      comments.filter((comment) => comment.author === user.id),
  },
  Mutation: {
    createUser: (_: any, args: any) => {
      const isExistEmail = users.some((user) => user.email === args.email);
      if (isExistEmail) {
        throw new ApolloError('Email already exist.', 'ALREADY_EXIST');
      }
      const user = {
        id: uuidv4(),
        email: args.email,
        name: args.name,
      };
      users.push(user);
      return user;
    },
  },
};

export { userResolver };
