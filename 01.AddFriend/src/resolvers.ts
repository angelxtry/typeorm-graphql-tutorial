import { userResolver } from './modules/user';
import { postResolvers } from './modules/post';
import { commentResolvers } from './modules/comment';

const resolvers = [userResolver, postResolvers, commentResolvers];

export default resolvers;
