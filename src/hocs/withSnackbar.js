import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Snackbar from '../components/Snackbar/Snackbar';

import { snackbarResetOptionsAction, snackbarSetOptionsAction } from '../redux/snackbar/snackbar.actions';

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
      snackbar: state.snackbar,
    }),
    (dispatch) => bindActionCreators({
      snackbarSetOptions: snackbarSetOptionsAction,
      snackbarResetOptions: snackbarResetOptionsAction,
    }, dispatch),
  ),
);

const withSnackbar = (ChildComponent) => enhanced((props) => {
  const {
    snackbar,
    snackbarSetOptions,
    snackbarResetOptions,
    auth,
  } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    snackbarResetOptions();
  };

  useEffect(() => {
    if (auth.error) {
      snackbarSetOptions({
        status: true,
        message: auth.error.message,
        type: 'error',
        handleClose,
      });
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.success) {
      snackbarSetOptions({
        status: true,
        message: auth.success.message,
        type: 'success',
        handleClose,
      });
    }
  }, [auth.success]);

  return (
    <>
      { snackbar.status && <Snackbar severity={snackbar.type} open={snackbar.status} message={snackbar.message} duration={snackbar.duration} handleClose={snackbar.handleClose} /> }
      <ChildComponent {...props} />
    </>
  );
});

export default withSnackbar;
