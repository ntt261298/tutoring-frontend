import { UserAction } from 'constants/action';
import auth from 'utils/auth';

const INITIAL_STATE = {
  loggedIn: auth.isAuth(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserAction.LOGOUT: {
      return {
        ...INITIAL_STATE,
        loggedIn: false,
      };
    }

    case UserAction.LOGIN_SUCCESS:
    case UserAction.LOGIN_BY_GOOGLE_SUCCESS:
    case UserAction.SIGN_UP_SUCCESS:
    case UserAction.SIGN_UP_BY_GOOGLE_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case UserAction.GET_INFO: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserAction.GET_INFO_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }

    default:
      break;
  }
  return state;
};
