import { ExpertAction } from 'constants/action';
import { get, post } from 'utils/request';

export const getExperts = params => ({
  type: ExpertAction.GET_EXPERTS,
  promise: get('/admin/experts', params),
});

export const createExpert = data => ({
  type: ExpertAction.CREATE_EXPERT,
  promise: post('/admin/experts', data),
});
