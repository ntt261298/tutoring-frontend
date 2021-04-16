import { UserSubscriptionAction } from 'constants/action';
import { get } from 'utils/request';

export const getUserSubscription = () => ({
  type: UserSubscriptionAction.GET_USER_SUBSCRIPTION,
  promise: get('/user/me/subscription_package'),
});
