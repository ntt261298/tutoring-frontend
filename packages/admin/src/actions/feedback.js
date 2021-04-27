import { FeedbackAction } from 'constants/action';
import { get } from 'utils/request';

export const getFeedback = params => ({
  type: FeedbackAction.GET_FEEDBACK,
  promise: get('/admin/feedback', params),
});
