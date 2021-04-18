import { UserAction } from 'constants/action';
import auth from 'utils/auth';

const INITIAL_STATE = {
  loggedIn: auth.isAuth(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserAction.LOGOUT: {
      auth.logout();
      return {
        ...INITIAL_STATE,
        loggedIn: false,
      };
    }

    case UserAction.LOGIN_WITH_GOOGLE_SUCCESS: {
      auth.setAuth(action.payload);
      return {
        ...state,
        ...action.payload,
        loggedIn: true,
      };
    }
    default:
      break;
  }
  return state;
};
