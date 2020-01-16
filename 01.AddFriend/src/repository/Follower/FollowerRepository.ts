import { EntityRepository, Repository } from 'typeorm';

import { Follow } from '../../entity/Follow';
import { User } from '../../entity/User';
import { getUserRepository } from '..';

@EntityRepository(Follow)
export class FollowerRepository extends Repository<Follow> {
  async followingUser(me: User, following: User) {
    if (me.id === following.id) return null;

    const checkMe = getUserRepository().hasId(me);
    const checkFollowing = getUserRepository().hasId(following);
    if (!checkMe || !checkFollowing) return null;

    const follow = this.create({ following, follower: me });
    const existFollow = await this.findOne(follow);
    if (existFollow) return null;

    return this.save(follow);
  }

  async getFollowers(following: User) {
    const followers = await this.find({
      where: { following },
      relations: ['follower', 'following'],
    });
    return followers;
  }

  async getFollowing(follower: User) {
    const followers = await this.find({
      where: { follower },
      relations: ['follower', 'following'],
    });
    return followers;
  }

  async getAllFollow(user: User) {
    const followers = await this.getFollowers(user);
    const following = await this.getFollowing(user);
    return [...followers, ...following];
  }

  async deleteFollower(me: User, follower: User) {
    if (me.id === follower.id) return null;

    const checkMe = getUserRepository().hasId(me);
    const checkFollower = getUserRepository().hasId(follower);
    if (!checkMe || !checkFollower) return null;

    await this.delete({ following: me, follower });
    return this.getFollowers(me);
  }

  async deleteFollowing(me: User, following: User) {
    if (me.id === following.id) return null;

    const checkMe = getUserRepository().hasId(me);
    const checkFollowing = getUserRepository().hasId(following);
    if (!checkMe || !checkFollowing) return null;

    await this.delete({ following, follower: me });
    return this.getFollowers(me);
  }

  async setCheckFollowers(me: User, followers: User[]) {
    const uncheckedFollowers = await this.getUncheckedFollowers(me, followers);
    await this.changeFollowerCheckedToTrue(uncheckedFollowers);
    const follow = await this.getFollowers(me);
    return follow;
  }

  async getUncheckedFollowers(following: User, followers: User[]) {
    const followerIds = followers.map((f) => f.id);
    const results = await this.createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follower', 'user')
      .where('follow.following = :following', { following: following.id })
      .andWhere('follow.checked = false')
      .andWhere('user.id IN (:...followers)', { followers: followerIds })
      .getMany();
    // console.log(results);
    return results;
  }

  async changeFollowerCheckedToTrue(uncheckedFollowers: Follow[]) {
    const results = uncheckedFollowers.map((f) => ({ ...f, checked: true }));
    // console.log(results);
    await this.save(results);
  }
}
