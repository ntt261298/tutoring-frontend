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

    case UserAction.LOGIN_SUCCESS:
    case UserAction.LOGIN_WITH_GOOGLE_SUCCESS:
    case UserAction.SIGNUP_SUCCESS: {
      auth.setAuth(action.payload);
      return {
        ...state,
        ...action.payload,
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

    case UserAction.GET_STATE_SUCCESS: {
      return {
        ...state,
        workingState: action.payload,
      };
    }

    case UserAction.UPDATE_STATE: {
      return {
        ...state,
        workingState: action.payload,
      };
    }

    default:
      break;
  }
  return state;
};
