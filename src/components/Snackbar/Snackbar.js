import React from 'react';
import PropTypes from 'prop-types';
import MaterialSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const Snackbar = ({
  open,
  message,
  severity,
  duration,
  handleClose,
}) => (
  <MaterialSnackbar open={open} autoHideDuration={duration} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </MaterialSnackbar>
);

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  severity: PropTypes.string.isRequired,
};

export default Snackbar;
