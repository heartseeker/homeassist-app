import {
  QUALIFYING_SET_QUESTIONS,
  QUALIFYING_SET_CURRENT_QUESTION,
} from './qualifying.action-types';

const INITIAL_STATE = {
  questions: null,
  currentQuestion: null,
  questionAnswers: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case QUALIFYING_SET_QUESTIONS:
      return { ...state, questions: payload };
    case QUALIFYING_SET_CURRENT_QUESTION: {
      return { ...state, currentQuestion: payload };
    }
    default:
      return state;
  }
};
