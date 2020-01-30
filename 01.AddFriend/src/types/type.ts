export interface Signup {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupArgs {
  input: Signup;
}

export interface UserInfo {
  id: number;
  email: string;
}
