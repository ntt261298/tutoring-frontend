import { FeedbackAction } from 'constants/action';
import { post } from 'utils/request';

export const createFeedback = data => ({
  type: FeedbackAction.CREATE_FEEDBACK,
  promise: post('/expert/feedback', data),
});
