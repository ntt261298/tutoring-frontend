import { StatisticAction } from 'constants/action';
import { get } from 'utils/request';

export const getStatistics = () => ({
  type: StatisticAction.GET_STATISTICS,
  promise: get('/admin/statistics'),
});
