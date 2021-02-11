import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_LOGOUT,
  AUTH_CALLED,
  AUTH_ERROR,
  AUTH_SET_USER,
} from './auth.action-types';

const INITIAL_STATE = {
  loading: false,
  user: null,
  called: false,
  error: null,
  success: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return { ...state, loading: payload };
    case AUTH_SET_USER:
      return { ...state, user: payload };
    case AUTH_CALLED:
      return { ...state, called: true };
    case AUTH_ERROR:
      return { ...state, error: payload };
    case AUTH_SUCCESS:
      return { ...state, success: payload };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
