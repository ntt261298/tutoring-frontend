import { UserAction } from 'constants/action';
import { post } from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const loginWithGoogle = data => ({
  type: UserAction.LOGIN_WITH_GOOGLE,
  promise: post('/log-in/admin/google', data),
});
