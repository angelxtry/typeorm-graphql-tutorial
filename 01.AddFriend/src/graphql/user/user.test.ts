import { Connection } from 'typeorm';
import { getUserInfoFromToken } from '../../utils/token';
import connectDB from '../../repository';
import * as userApi from './user.api';

let conn: Connection;
beforeAll(async () => {
  conn = await connectDB();
});
afterAll(async () => {
  await conn.close();
});

describe('signup test', () => {
  it(`signup은 email, password, nickname을 인자로 받아
    회원가입을 실행하고 계정정보와 token을 리턴한다.`, async () => {
    const email = 'abc@gmail.com';
    const password = 'abc';
    const nickname = 'abc';

    const {
      data: {
        data: {
          signup: { user, token },
        },
      },
    } = await userApi.signup({ email, password, nickname });

    // console.log(user);
    // console.log(token);
    expect(user.email).toEqual(email);
    expect(user.nickname).toEqual(nickname);

    const userInfo = getUserInfoFromToken(token);
    expect(userInfo.email).toEqual(email);
  });

  it('이미 존재하는 email일 경우 Apollo error(signup error)를 리턴한다.', async () => {
    const email = 'abc@gmail.com';
    const password = 'abc';
    const nickname = 'abc';

    await userApi.signup({ email, password, nickname });
    const {
      data: { errors },
    } = await userApi.signup({ email, password, nickname });

    // console.log(errors[0].message);
    // console.log(errors[0].locations);
    // console.log(errors[0].path);
    // console.log(errors[0].extensions);
    //   Signup error
    //   [ { line: 3, column: 9 } ]
    //   [ 'signup' ]
    //   { code: 'SIGNUP_ERROR' }
    expect(errors[0].message).toEqual('Signup error');
    expect(errors[0].extensions.code).toEqual('SIGNUP_ERROR');
  });
});
