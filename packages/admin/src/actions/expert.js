import { ExpertAction } from 'constants/action';
import {
  get, post, put, del,
} from 'utils/request';

export const getExperts = params => ({
  type: ExpertAction.GET_EXPERTS,
  promise: get('/admin/experts', params),
});

export const createExpert = data => ({
  type: ExpertAction.CREATE_EXPERT,
  promise: post('/admin/experts', data),
});

export const updateExpert = (expertId, data) => ({
  type: ExpertAction.UPDATE_EXPERT,
  promise: put(`/admin/experts/${expertId}`, data),
});

export const deleteExpert = expertId => ({
  type: ExpertAction.DELETE_EXPERT,
  promise: del(`/admin/experts/${expertId}`),
});

export const undoDeleteExpert = expertId => ({
  type: ExpertAction.UNDO_DELETE_EXPERT,
  promise: put(`/admin/experts/${expertId}/undo-delete`),
});

export const getActiveExperts = () => ({
  type: ExpertAction.GET_ACTIVE_EXPERTS,
  promise: get('/admin/active-experts'),
});
