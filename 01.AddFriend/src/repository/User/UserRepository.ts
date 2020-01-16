import { EntityRepository, Repository } from 'typeorm';

import { User } from '../../entity/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async addUser(email: string, nickname: string) {
    const user = this.create({ email, nickname });
    return this.save(user);
  }
}
