import { UserAction } from 'constants/action';
import { post } from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const login = (email, password) => ({
  type: UserAction.LOGIN,
  promise: post('/asker/login', {
    email,
    password,
  }),
});
