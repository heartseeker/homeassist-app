import {
  SNACKBAR_SET_OPTIONS,
  SNACKBAR_RESET_OPTIONS,
} from './snackbar.action-types';

const INITIAL_STATE = {
  status: false,
  message: '',
  duration: 4000,
  type: 'success',
  handleClose: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SNACKBAR_SET_OPTIONS:
      return { ...state, ...payload };
    case SNACKBAR_RESET_OPTIONS:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};
