import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-express';
import { createToken } from '../../utils/token';
import { User } from '../../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async addUser(email: string, password: string, nickname: string) {
    const existedUser = await this.findOne({ email });
    if (existedUser) {
      throw new ApolloError('Signup error', 'SIGNUP_ERROR');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInstance = this.create({
      email,
      nickname,
      password: hashedPassword,
    });
    const user = await this.save(userInstance);
    const token = createToken(user);

    return { user, token };
  }
}
