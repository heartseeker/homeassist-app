import React, { useEffect } from 'react';
import Proptypes from 'prop-types';

import { makeStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { setQuestionsAction } from '../../redux/qualifying/qualifying.action';

import MainLayout from '../../components/MainLayout.js/MainLayout';
import QualifyingQuestion from '../../components/QualifyingQuestion/QualifyingQuestion';
import { QUESTIONS } from '../../config/questions';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '50rem',
    alignSelf: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
});

const HomeLoanQualifying = ({
  qualifying,
  setQuestions,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setQuestions(QUESTIONS);
  }, []);
  return (
    <MainLayout>
      <div className={classes.paper}>
        <h1 className={classes.title}>Home Loan Qualifying</h1>
        { qualifying && qualifying.questions && <QualifyingQuestion /> }
      </div>
    </MainLayout>
  );
};

HomeLoanQualifying.propTypes = {
  qualifying: Proptypes.object.isRequired,
  setQuestions: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      qualifying: state.qualifying,
    }),
    (dispatch) => bindActionCreators({
      setQuestions: setQuestionsAction,
    }, dispatch),
  ),
);

export default enhanced(HomeLoanQualifying);
