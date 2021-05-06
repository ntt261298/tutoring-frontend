import { ExpertAction } from 'constants/action';
import { get } from 'utils/request';

export const getExperts = params => ({
  type: ExpertAction.GET_EXPERTS,
  promise: get('/user/me/experts', params),
});
