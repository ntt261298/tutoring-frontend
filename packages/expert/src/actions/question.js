import { CaseConverter } from '@tutoring/commons/utils';
import { QuestionAction } from 'constants/action';
import { get, post, put } from 'utils/request';

export const getState = () => ({
  type: QuestionAction.GET_STATE,
  promise: get('/expert/me/state'),
});

export const updateState = state => ({
  type: QuestionAction.UPDATE_STATE,
  payload: state,
});

export const claim = data => ({
  type: QuestionAction.CLAIM,
  promise: post('/expert/me/bids', data),
});

export const skip = data => ({
  type: QuestionAction.SKIP,
  promise: post('/expert/me/skips', data),
});

export const endSession = questionId => ({
  type: QuestionAction.END_SESSION,
  promise: put(`/expert/me/questions/${questionId}`),
});

export function sendMessage(data) {
  const { file, ...rest } = data;
  const formData = new FormData();
  if (file) formData.append('file', file, file.name);
  const convertedCaseData = CaseConverter.camelCaseToSnakeCase({ ...rest });
  Object.keys(convertedCaseData).forEach((key) => {
    formData.append(key, convertedCaseData[key]);
  });

  return {
    type: QuestionAction.SEND_MESSAGE,
    promise: post('/expert/me/question_messages', formData, {
      'Content-Type': 'multipart/form-data',
    }),
  };
}

export const newMessage = message => ({
  type: QuestionAction.NEW_MESSAGE,
  payload: message,
});
