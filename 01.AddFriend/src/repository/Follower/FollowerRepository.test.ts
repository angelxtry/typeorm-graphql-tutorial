import { Connection } from 'typeorm';
import { Follow } from '../../entity/Follow';
import connectDB, { getUserRepository, getFollowerRepository } from '..';

let conn: Connection;
beforeEach(async () => {
  conn = await connectDB();
});
afterEach(async () => {
  await conn.close();
});

const aaaEmail = 'aaa@gmail.com';
const aaaPassword = 'aaa';
const aaaNickname = 'aaa';
const bbbEmail = 'bbb@gmail.com';
const bbbPassword = 'bbb';
const bbbNickname = 'bbb';
const cccEmail = 'ccc@gmail.com';
const cccPassword = 'ccc';
const cccNickname = 'ccc';
const dddEmail = 'ddd@gmail.com';
const dddPassword = 'ddd';
const dddNickname = 'ddd';

describe('following test', () => {
  it('aaa가 bbb를 following 하면, 리턴값을 aaa의 Follow instance다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const follow = (await getFollowerRepository().followingUser(
      aaa.user,
      bbb.user,
    )) as Follow;
    // console.log(follow);
    expect(follow.follower.email).toEqual(aaa.user.email);
    expect(follow.following.email).toEqual(bbb.user.email);
    expect(Object.keys(follow)).toEqual(
      expect.arrayContaining([
        'following',
        'follower',
        'id',
        'checked',
        'createdAt',
        'updatedAt',
      ]),
    );
  });

  it('자기 자신을 following하면 null을 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const follow = (await getFollowerRepository().followingUser(
      aaa.user,
      aaa.user,
    )) as Follow;
    expect(follow).toBeNull();
  });

  it('없는 user를 following하면 null을 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const noUser = getUserRepository().create({ email: 'ccc' });
    const noUserFollow = await getFollowerRepository().followingUser(
      aaa.user,
      noUser,
    );
    expect(noUserFollow).toBeNull();
  });

  it('aaa가 bbb를 following 한 후 다시 following 하면 null을 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      aaaPassword,
      bbbNickname,
    );
    const follow = (await getFollowerRepository().followingUser(
      aaa.user,
      bbb.user,
    )) as Follow;
    expect(follow.follower.email).toEqual(aaa.user.email);
    expect(follow.following.email).toEqual(bbb.user.email);

    // 이미 following 한 유저를 following하면 null
    const refollow = await getFollowerRepository().followingUser(
      aaa.user,
      bbb.user,
    );
    expect(refollow).toBeNull();

    const followersOfbbb = await getFollowerRepository().getFollowers(bbb.user);
    // console.log(followersOfbbb);
    expect(followersOfbbb).toHaveLength(1);
    expect(followersOfbbb.map((f) => f.follower.email)).toEqual([
      aaa.user.email,
    ]);
  });

  it('aaa, bbb가 ccc를 following 하면 ccc의 followers는 User[2]를 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, ccc.user);
    await getFollowerRepository().followingUser(bbb.user, ccc.user);
    const followersOfccc = await getFollowerRepository().getFollowers(ccc.user);
    // console.log(followersOfccc);
    expect(followersOfccc).toHaveLength(2);
    expect(followersOfccc.map((f) => f.follower.email).sort()).toEqual(
      [aaa.user.email, bbb.user.email].sort(),
    );
  });

  it('aaa가 bbb, ccc를 following 하면 aaa의 following는 User[2]를 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, bbb.user);
    await getFollowerRepository().followingUser(aaa.user, ccc.user);
    const followingOfAaa = await getFollowerRepository().getFollowing(aaa.user);
    // console.log(followingOfAaa);
    expect(followingOfAaa).toHaveLength(2);
    expect(followingOfAaa.map((f) => f.following.email).sort()).toEqual(
      [bbb.user.email, ccc.user.email].sort(),
    );
  });

  it('aaa의 following, followers를 모두 조회한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    const ddd = await getUserRepository().addUser(
      dddEmail,
      dddPassword,
      dddNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, bbb.user);
    await getFollowerRepository().followingUser(aaa.user, ccc.user);
    await getFollowerRepository().followingUser(ddd.user, aaa.user);
    const allFollowOfAaa = await getFollowerRepository().getAllFollow(aaa.user);
    // console.log(allFollowOfAaa);
    expect(allFollowOfAaa).toHaveLength(3);
  });
});

describe('follow/following 삭제', () => {
  it('follower를 삭제 할 수 있다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, ccc.user);
    await getFollowerRepository().followingUser(bbb.user, ccc.user);
    const followOfCcc = (await getFollowerRepository().deleteFollower(
      ccc.user,
      aaa.user,
    )) as Follow[];
    // console.log(followOfCcc);
    expect(followOfCcc).toHaveLength(1);
    expect(followOfCcc[0].follower.email).toEqual(bbbEmail);
  });

  it('following을 삭제 할 수 있다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, bbb.user);
    await getFollowerRepository().followingUser(aaa.user, ccc.user);

    await getFollowerRepository().deleteFollowing(aaa.user, bbb.user);

    const followOfBbb = await getFollowerRepository().getFollowers(bbb.user);
    const followOfCcc = await getFollowerRepository().getFollowers(ccc.user);
    // console.log(followOfAaa);
    expect(followOfBbb).toEqual([]);
    expect(followOfCcc).toHaveLength(1);
    expect(followOfCcc[0].follower.email).toEqual(aaaEmail);
  });

  it('following을 모두 삭제하면 빈 배열을 리턴한다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, bbb.user);
    const followOfAaa = (await getFollowerRepository().deleteFollowing(
      aaa.user,
      bbb.user,
    )) as Follow[];
    // console.log(followOfAaa);
    expect(followOfAaa).toEqual([]);
  });
});

describe('client에서의 follower 확인', () => {
  it('follower의 일부만 확인(check: false -> true)할 수 있다.', async () => {
    const aaa = await getUserRepository().addUser(
      aaaEmail,
      aaaPassword,
      aaaNickname,
    );
    const bbb = await getUserRepository().addUser(
      bbbEmail,
      bbbPassword,
      bbbNickname,
    );
    const ccc = await getUserRepository().addUser(
      cccEmail,
      cccPassword,
      cccNickname,
    );
    const ddd = await getUserRepository().addUser(
      dddEmail,
      dddPassword,
      dddNickname,
    );
    await getFollowerRepository().followingUser(aaa.user, ddd.user);
    await getFollowerRepository().followingUser(bbb.user, ddd.user);
    await getFollowerRepository().followingUser(ccc.user, ddd.user);
    const followOfDdd = await getFollowerRepository().setCheckFollowers(
      ddd.user,
      [bbb.user, ccc.user],
    );
    // console.log(followOfDdd);
    expect(followOfDdd).toHaveLength(3);
    const followOfAaa = followOfDdd.find(
      (f: Follow) => f.follower.email === aaaEmail,
    ) as Follow;
    const followOfBbb = followOfDdd.find(
      (f: Follow) => f.follower.email === bbbEmail,
    ) as Follow;
    const followOfCcc = followOfDdd.find(
      (f: Follow) => f.follower.email === cccEmail,
    ) as Follow;
    expect(followOfAaa.checked).toEqual(false);
    expect(followOfBbb.checked).toEqual(true);
    expect(followOfCcc.checked).toEqual(true);
  });
});
