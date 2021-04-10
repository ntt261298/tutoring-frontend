import { UserAction } from 'constants/action';
import { get, post, put } from 'utils/request';

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

export const updateProfile = data => ({
  type: UserAction.UPDATE_PROFILE,
  promise: put('/user/me/info', data),
});

export const updatePassword = data => ({
  type: UserAction.UPDATE_PASSWORD,
  promise: put('/user/me/password', data),
});


export const getInfo = () => ({
  type: UserAction.GET_INFO,
  promise: get('/user/me/info'),
});
