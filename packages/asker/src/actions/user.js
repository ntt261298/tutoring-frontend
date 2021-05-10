import { UserAction } from 'constants/action';
import { get, post, put } from 'utils/request';

export const logout = () => ({
  type: UserAction.LOGOUT,
});

export const loginEmail = data => ({
  type: UserAction.LOGIN,
  promise: post('/log-in/user/email', data),
});

export const loginWithGoogle = data => ({
  type: UserAction.LOGIN_WITH_GOOGLE,
  promise: post('/log-in/user/google', data),
});

export const signupEmail = data => ({
  type: UserAction.SIGNUP,
  promise: post('/sign-up/user/email', {
    email: data.email,
    password: data.password,
    browserFingerprint: data.browserFingerprint,
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

export const getBrainTreeClientToken = () => ({
  type: UserAction.GET_BRAINTREE_CLIENT_TOKEN,
  promise: get('/user/me/payments/braintree'),
});

export const purchasePackage = data => ({
  type: UserAction.PURCHASE_CREDIT_PACKAGES,
  promise: post('/user/me/transactions', data),
});

export const getState = () => ({
  type: UserAction.GET_STATE,
  promise: get('/user/me/state'),
});

export const updateState = data => ({
  type: UserAction.UPDATE_STATE,
  payload: data,
});

export const getTransactions = params => ({
  type: UserAction.GET_TRANSACTIONS,
  promise: get('/user/me/transactions', params),
});
