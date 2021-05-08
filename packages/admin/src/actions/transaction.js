import { TransactionAction } from 'constants/action';
import { get } from 'utils/request';

export const getTransactions = (params = {}) => ({
  type: TransactionAction.GET_TRANSACTIONS,
  promise: get('/admin/transactions', params),
});
