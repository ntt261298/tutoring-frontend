import { UserAction } from 'constants/action';
import {
  get, post, put, del,
} from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const loginEmail = data => ({
  type: UserAction.LOGIN,
  promise: post('/log-in/expert/email', data),
});

export const updateProfile = data => ({
  type: UserAction.UPDATE_PROFILE,
  promise: put('/expert/me/info', data),
});

export const updatePassword = data => ({
  type: UserAction.UPDATE_PASSWORD,
  promise: put('/expert/me/password', data),
});


export const getInfo = () => ({
  type: UserAction.GET_INFO,
  promise: get('/expert/me/info'),
});

export const connect = () => ({
  type: UserAction.CONNECT,
  promise: post('/expert/me/connections'),
});

export const disconnect = () => ({
  type: UserAction.CONNECT,
  promise: del('/expert/me/connections'),
});

export const getEarnings = params => ({
  type: UserAction.GET_EARNINGS,
  promise: get('/expert/me/earnings', params),
});
