import { AUTH_SUCCESS, AUTH_LOADING, AUTH_LOGOUT } from './auth.action-types';

export const authLoadingAction = (payload) => ({
  type: AUTH_LOADING,
  payload,
});

export const authLoginSuccessAction = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authLogoutAction = () => ({
  type: AUTH_LOGOUT,
});

export const authLoginAction = (payload) => async (dispatch) => {
  dispatch(authLoadingAction(true));
  setTimeout(() => {
    dispatch(authLoginSuccessAction(payload));
    dispatch(authLoadingAction(false));
  }, 3000);
};
