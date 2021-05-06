import { QuestionAction } from 'constants/action';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionAction.GET_STATE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case QuestionAction.UPDATE_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case QuestionAction.NEW_MESSAGE: {
      return {
        ...state,
        questionInfo: {
          ...state.questionInfo,
          messages: state.questionInfo.messages.concat(action.payload),
        },
      };
    }

    default:
      break;
  }
  return state;
};
