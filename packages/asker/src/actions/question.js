import { CaseConverter } from '@tutoring/commons/utils';
import { get, post } from 'utils/request';
import { QuestionAction } from 'constants/action';

export const newQuestion = (data) => {
  const { file, ...rest } = data;
  const formData = new FormData();
  if (file) formData.append('file', file, file.name);
  const convertedCaseData = CaseConverter.camelCaseToSnakeCase({ ...rest });
  Object.keys(convertedCaseData).forEach((key) => {
    formData.append(key, convertedCaseData[key]);
  });

  return {
    type: QuestionAction.NEW_QUESTION,
    promise: post('/user/me/questions', formData, {
      'Content-Type': 'multipart/form-data',
    }),
  };
};

export const getQuestionById = questionId => ({
  type: QuestionAction.GET_QUESTION_BY_ID,
  promise: get(`/user/me/questions/${questionId}`),
});

export const rate = data => ({
  type: QuestionAction.RATE,
  promise: post('/user/me/ratings', data),
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
    promise: post('/user/me/question_messages', formData, {
      'Content-Type': 'multipart/form-data',
    }),
  };
}

export const newMessage = message => ({
  type: QuestionAction.NEW_MESSAGE,
  payload: message,
});

export const getQuestions = params => ({
  type: QuestionAction.GET_QUESTIONS,
  promise: get('/user/me/questions', params),
});
