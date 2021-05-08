import { SubscriptionPackageAction } from 'constants/action';
import { get, put } from 'utils/request';

export const getSubscriptionPackages = () => ({
  type: SubscriptionPackageAction.GET_SUBSCRIPTION_PACKAGES,
  promise: get('/admin/subscription-packages'),
});


export const updateSubscriptionPackage = (packageId, data) => ({
  type: SubscriptionPackageAction.UPDATE_SUBSCRIPTION_PACKAGE,
  promise: put(`/admin/subscription-packages/${packageId}`, data),
});
