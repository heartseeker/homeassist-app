import {
  SNACKBAR_SET_OPTIONS,
  SNACKBAR_RESET_OPTIONS,
} from './snackbar.action-types';

export const snackbarSetOptionsAction = (payload) => ({
  type: SNACKBAR_SET_OPTIONS,
  payload,
});

export const snackbarResetOptionsAction = () => ({
  type: SNACKBAR_RESET_OPTIONS,
});
