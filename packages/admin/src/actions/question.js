import { QuestionAction } from 'constants/action';
import { get } from 'utils/request';

export const getActiveQuestions = () => ({
  type: QuestionAction.GET_ACTIVE_QUESTIONS,
  promise: get('/admin/active-questions'),
});

export const getQuestions = params => ({
  type: QuestionAction.GET_QUESTIONS,
  promise: get('/admin/questions', params),
});
