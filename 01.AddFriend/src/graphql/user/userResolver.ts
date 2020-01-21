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
    signup: () => {},
  },
};

export { userResolver };
