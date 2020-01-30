import { getUserRepository } from '../../repository';
import { SignupArgs } from '../../types/type';

const userResolver = {
  Query: {
    signin: () => {},
    me: () => {},
    user: () => {},
    users: () => {},
  },
  User: {
    following: () => {},
    followers: () => {},
  },
  Mutation: {
    signup: async (_: any, args: SignupArgs) => {
      const { input: { email, password, nickname } } = args;
      // console.log('signup resolver: ', email, password, nickname);
      const user = await getUserRepository().addUser(email, password, nickname);
      return user;
    },
  },
};

export { userResolver };
