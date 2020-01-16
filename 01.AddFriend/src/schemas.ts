import querySchema from './modules/common/querySchema';
import mutationSchema from './modules/common/mutationSchema';
import subscriptionSchema from './modules/common/subscriptionSchema';
import { userSchema } from './modules/user';
import { postSchema } from './modules/post';
import { commentSchema } from './modules/comment';

const schemas = [
  querySchema,
  mutationSchema,
  subscriptionSchema,
  userSchema,
  postSchema,
  commentSchema,
];

export default schemas;
