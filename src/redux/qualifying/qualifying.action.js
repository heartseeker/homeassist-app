import {
  QUALIFYING_SET_QUESTIONS,
  QUALIFYING_SET_CURRENT_QUESTION,
} from './qualifying.action-types';

export const setCurrentQuestionAction = (payload) => ({
  type: QUALIFYING_SET_CURRENT_QUESTION,
  payload,
});

export const setQuestionsAction = (payload) => ({
  type: QUALIFYING_SET_QUESTIONS,
  payload,
});
