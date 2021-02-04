import { AUTH_SUCCESS, AUTH_LOADING, AUTH_LOGOUT } from './auth.action-types';

const INITIAL_STATE = {
  loading: false,
  email: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return { ...state, loading: payload };
    case AUTH_SUCCESS:
      return { ...state, ...payload };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
