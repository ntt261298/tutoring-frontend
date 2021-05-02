import { QuestionAction } from 'constants/action';
import { get } from 'utils/request';

export const getState = () => ({
  type: QuestionAction.GET_STATE,
  promise: get('/expert/me/state'),
});
