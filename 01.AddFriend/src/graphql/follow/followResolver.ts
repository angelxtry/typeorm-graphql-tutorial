const followResolver = {
  Query: {
    getFollowers: () => {},
    getFollowing: () => {},
  },
  Follow: {
    following: () => {},
    follower: () => {},
  },
  Mutation: {
    setFollowing: () => {},
    deleteFollowing: () => {},
    deleteFollower: () => {},
    checkFollower: () => {},
  },
};

export { followResolver };
