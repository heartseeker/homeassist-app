import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const FormTextField = ({ label, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : '';
  return (
    <TextField {...props} label={label} helperText={errorText} error={errorText !== ''} />
  );
};

FormTextField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormTextField;
