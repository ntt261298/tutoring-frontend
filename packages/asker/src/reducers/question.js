import { QuestionAction } from 'constants/action';

export const INITIAL_STATE = {
  userId: 0,
  created: null,
  credits: null,
  expertId: 0,
  messages: [],
  fileData: null,
  id: 0,
  questionState: {
    state: 'Complete',
  },
  text: null,
  topic: {
    id: 0,
    name: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionAction.GET_QUESTION_BY_ID_SUCCESS:
      return action.payload;

    case QuestionAction.NEW_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    }

    default:
      break;
  }
  return state;
};
