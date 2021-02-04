import React from 'react';
import Proptypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
  title: {
    marginBottom: 20,
  },
  radio: {
    color: '#1a1a1a',
  },
  note: {
    marginBottom: 20,
    color: '#1a1a1a',
  },
});

const RadioFieldSet = ({
  question,
  answer,
  note,
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <Typography className={classes.title} variant="h5">
        {question.question}
      </Typography>
      { note && <Typography className={classes.note} variant="body2">{note}</Typography> }
      <RadioGroup
        name={question.questionId}
        value={answer}
        onChange={handleChange}
      >
        {question.options.map((option) => (
          <FormControlLabel key={option.answerId} className={classes.radio} value={option.answerId} control={<Radio />} label={option.answer} />
        ))}
      </RadioGroup>
      {/* { note && <FormHelperText>{{ note }}</FormHelperText> } */}
    </FormControl>
  );
};

RadioFieldSet.propTypes = {
  question: Proptypes.object.isRequired,
  answer: Proptypes.string,
  note: Proptypes.string,
  handleChange: Proptypes.func.isRequired,
};

RadioFieldSet.defaultProps = {
  note: '',
  answer: '',
};

export default RadioFieldSet;
