import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
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

const renderValue = (selected, options) => {
  const firstSelected = options.find((o) => o.value === selected[0]);
  if (selected.length === 1) {
    return firstSelected.label;
  }
  return `${firstSelected.label} +${selected.length - 1} more`;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
    },
  },
};

const MultipleSelectField = ({ label, options, ...props }) => {
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
        multiple
        error={errorText !== ''}
        renderValue={(selected) => renderValue(selected, options)}
        MenuProps={MenuProps}
        value={field.value}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            <Checkbox checked={!!field.value.find((v) => v === o.value)} />
            <ListItemText primary={o.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultipleSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default MultipleSelectField;
