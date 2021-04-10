import { UserAction } from 'constants/action';
import { post } from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const loginEmail = data => ({
  type: UserAction.LOGIN,
  promise: post('/log-in/user/email', data),
});

export const signupEmail = data => ({
  type: UserAction.SIGNUP,
  promise: post('/sign-up/user/email', {
    email: data.email,
    password: data.password,
  }),
});
