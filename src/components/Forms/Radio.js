import React from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import Proptypes from 'prop-types';
import { useField } from 'formik';

const FormRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel {...field} control={<Radio />} label={label} />
  );
};

FormRadio.propTypes = {
  label: Proptypes.string.isRequired,
  props: Proptypes.any.isRequired,
};

export default FormRadio;
