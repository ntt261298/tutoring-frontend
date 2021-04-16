import { SubscriptionAction } from 'constants/action';

export const INITIAL_STATE = {
  packages: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SubscriptionAction.GET_SUBSCRIPTION_SUCCESS:
      return {
        packages: action.payload?.packages,
      };

    default:
      break;
  }
  return state;
};
