import { UserAction } from 'constants/action';
import {
  post, get, put, del,
} from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const loginWithGoogle = data => ({
  type: UserAction.LOGIN_WITH_GOOGLE,
  promise: post('/log-in/admin/google', data),
});

export const createUser = data => ({
  type: UserAction.CREATE_USER,
  promise: post('/admin/users', data),
});

export const updateUser = (userId, data) => ({
  type: UserAction.UPDATE_USER,
  promise: put(`/admin/users/${userId}`, data),
});


export const getUsers = params => ({
  type: UserAction.GET_USERS,
  promise: get('/admin/users', params),
});

export const deleteUser = userId => ({
  type: UserAction.DELETE_USER,
  promise: del(`/admin/users/${userId}`),
});

export const undoDeleteUser = userId => ({
  type: UserAction.UNDO_DELETE_USER,
  promise: put(`/admin/users/${userId}/undo-delete`),
});
