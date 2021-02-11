import {
  AUTH_SUCCESS,
  AUTH_LOADING,
  AUTH_LOGOUT,
  AUTH_CALLED,
  AUTH_ERROR,
  AUTH_SET_USER,
} from './auth.action-types';

export const authLoadingAction = (payload) => ({
  type: AUTH_LOADING,
  payload,
});

export const authSuccessAction = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authSetUserAction = (payload) => ({
  type: AUTH_SET_USER,
  payload,
});

export const authLogoutAction = () => ({
  type: AUTH_LOGOUT,
});

export const authCalledAction = () => ({
  type: AUTH_CALLED,
});

export const authErrorAction = (payload) => ({
  type: AUTH_ERROR,
  payload,
});
