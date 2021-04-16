import { SubscriptionAction } from 'constants/action';
import { get } from 'utils/request';

export const getSubscription = () => ({
  type: SubscriptionAction.GET_SUBSCRIPTION,
  promise: get('/user/subscription_package'),
});
