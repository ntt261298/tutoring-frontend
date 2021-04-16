import { UserSubscriptionAction } from 'constants/action';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserSubscriptionAction.GET_USER_SUBSCRIPTION_SUCCESS:
      return action.payload;
    default:
      break;
  }
  return state;
};
