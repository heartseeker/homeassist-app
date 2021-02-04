import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { setQuestionsAction } from '../../redux/qualifying/qualifying.action';

import MainLayout from '../../components/MainLayout.js/MainLayout';
import QualifyingQuestion from '../../components/QualifyingQuestion/QualifyingQuestion';
import { QUESTIONS } from '../../config/questions';

const HomeLoanQualifying = ({
  qualifying,
  setQuestions,
}) => {
  useEffect(() => {
    setQuestions(QUESTIONS);
  }, []);
  return (
    <MainLayout>
      <h1>Home Loan Qualifying</h1>
      { qualifying && qualifying.questions && <QualifyingQuestion /> }
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
