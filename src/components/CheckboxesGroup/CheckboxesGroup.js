import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import * as _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { noneOfTheAbove } from '../../config/questions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    marginBottom: 20,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkbox: {
    color: '#1a1a1a',
  },
}));

const CheckboxesGroup = ({
  // eslint-disable-next-line no-unused-vars
  answer,
  question,
  handleChange,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const renderCheckboxes = () => question.options.map((option) => (
    <FormControlLabel
      key={option.answerId}
      name={option.answerId}
      control={<Checkbox />}
      label={option.answer}
      className={classes.checkbox}
      checked={state[option.answerId]}
      value={option.answerId}
      onChange={handleChangeCheckbox}
    />
  ));

  const hasNoneOfTheAbove = () => {
    /* eslint-disable */
    const newState = {};
    let hasNoneOfTheAbove = false;
    for (const [key, value] of Object.entries(state)) {
      newState[key] = false;
      if (noneOfTheAbove.includes(key)) {
        if (!value) {
          newState[key] = false;
        } else {
          newState[key] = true;
          hasNoneOfTheAbove = true;
        }
      }
    }
    return { hasNoneOfTheAbove, newState };
  };

  useEffect(() => {
    if (!state) {
      return;
    }

    if (hasNoneOfTheAbove().hasNoneOfTheAbove && !_.isEqual(state, hasNoneOfTheAbove().newState)) {
      setState(hasNoneOfTheAbove().newState);
    }

    handleChange(state);
  }, [state]);

  useEffect(() => {
    let options = {};
    question.options.forEach((o) => {
      options = { ...options, [o.answerId]: false };
    });
    // set default state of checkboxes
    setState(options);
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (!answer || hasNoneOfTheAbove().hasNoneOfTheAbove) {
      return;
    }

    // populate data if have previous answer
    let updatedState = { ...state };
    answer.forEach((ans) => {
      if (_.has(updatedState, ans.answerId)) {
        updatedState = { ...updatedState, [ans.answerId]: true };
      }
    });
    if (!_.isEqual(state, updatedState) && !_.isEmpty(updatedState)) {
      setState(updatedState);
    }
  }, [answer]);

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography className={classes.title} variant="h5">
          {question.question}
        </Typography>
        <FormGroup>{state && renderCheckboxes()}</FormGroup>
      </FormControl>
    </div>
  );
};

CheckboxesGroup.propTypes = {
  question: Proptypes.object.isRequired,
  answer: Proptypes.array.object,
  handleChange: Proptypes.func.isRequired,
};

CheckboxesGroup.defaultProps = {
  answer: null,
};

export default CheckboxesGroup;
