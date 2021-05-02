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

    default:
      break;
  }
  return state;
};
