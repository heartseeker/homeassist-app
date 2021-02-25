import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useField } from 'formik';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       minWidth: 250,
//     },
//   },
// };

const SelectField = ({ label, options, ...props }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props);
  const errorText = meta.touched && meta.error ? meta.error : '';
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...props}
        label={label}
        error={errorText !== ''}
        // MenuProps={MenuProps}
        value={field.value}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            <ListItemText primary={o.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectField;
