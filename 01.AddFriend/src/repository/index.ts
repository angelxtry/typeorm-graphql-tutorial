import { getConnectionOptions, createConnection, Connection } from 'typeorm';

import { UserRepository } from './User';
import { FollowerRepository } from './Follower/FollowerRepository';

let connection: Connection;

const connectDB = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  connection = await createConnection({
    ...connectionOptions,
    name: 'default',
  });
  return connection;
};

export const getUserRepository = (): UserRepository =>
  connection.getCustomRepository(UserRepository);

export const getFollowerRepository = (): FollowerRepository =>
  connection.getCustomRepository(FollowerRepository);

export default connectDB;
