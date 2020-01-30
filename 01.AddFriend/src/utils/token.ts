import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { UserInfo } from '../types/type';

export const createToken = (userInfo: UserInfo) => {
  // console.log('createToken: ', userInfo);
  const { id, email } = userInfo;
  if (!id || !email) {
    throw new ApolloError('Token create error', 'TOKEN_CREATE_ERROR');
  }
  const token = jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRATION_PERIOD,
      issuer: 'friend.com',
    },
  );
  return token;
};

export const getUserInfoFromToken = (token: string) => {
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as UserInfo;
    return user;
  } catch (error) {
    console.log(error);
    throw new ApolloError('Token decrypt error.', 'TOKEN_DECRYPT_ERROR');
  }
};
