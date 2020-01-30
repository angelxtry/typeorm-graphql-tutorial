import 'dotenv/config';
import axios from 'axios';
import { Signup } from '../../types/type';

const URL = process.env.TEST_HOST as string;

export const signup = async (variables: Signup) =>
  axios.post(URL, {
    query: `
      mutation($email: String!, $password: String!, $nickname: String!) {
        signup(input: {
          email: $email
          password: $password
          nickname: $nickname
        }) {
          user {
            id
            email
            nickname
          }
          token
        }
      }
    `,
    variables,
  });
