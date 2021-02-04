import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  makeStyles,
  Typography,
} from '@material-ui/core';

import {
  setCurrentQuestionAction,
} from '../../redux/qualifying/qualifying.action';

import { palette } from '../../styles/theme';
import { NEXT, noneOfTheAbove } from '../../config/questions';
import RadioFieldSet from '../RadioFieldSet/RadioFieldSet';
import CheckboxesGroup from '../CheckboxesGroup/CheckboxesGroup';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  starting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 20,
    color: palette.primary.main,
  },
  answers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ansButton: {
    marginTop: 20,
    color: '#fff',
    width: 250,
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  actionButton: {
    color: '#fff',
    minWidth: 165,
    height: 50,
    marginRight: 20,
  },
  getStarted: {
    marginTop: 50,
    color: '#fff',
    minHeight: 50,
  },
});

const QualifyingQuestion = ({
  setCurrentQuestion,
  qualifying,
}) => {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // value of the answer obly
  const [currentAnswer, setCurrentAnswer] = useState('');
  // whole object of the answer
  const [completeAnswer, setCompleteAnswer] = useState(null);
  const [historyTrace, setHistoryTrace] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isStarted, setIsStarted] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [note, setNote] = useState(null);
  const [from, setFrom] = useState(null);

  const updatHistoryTrace = (answer) => {
    // update answer in history trace
    const updatedHistoryTrace = historyTrace.map((q) => {
      if (q.questionId === qualifying.currentQuestion.questionId) {
        return { ...q, answer };
      }
      return q;
    });
    setHistoryTrace(updatedHistoryTrace);
    setCurrentAnswer(null);
    setNote('');
  };

  const radioNextQuestionAction = () => {
    const { currentQuestion } = qualifying;
    const answer = currentQuestion.options.find((o) => o.answerId === currentAnswer);
    setCompleteAnswer(answer);
    // terminate if no next question
    if ([NEXT.end, NEXT.completed].includes(answer.next)) {
      setIsFinal(true);
      return;
    }

    const nextQuestionId = answer.nextQuestionId;
    const nextQuestionIndex = qualifying.questions.findIndex((q) => q.questionId === nextQuestionId);
    setCurrentQuestionIndex(nextQuestionIndex);

    // update answer in history trace
    updatHistoryTrace(answer);
  };

  const checkboxNextQuestionAction = () => {
    currentAnswer.forEach((ans) => {
      if (noneOfTheAbove.includes(ans.answerId)) {
        setCompleteAnswer(ans);
        setIsFinal(true);
      }
    });

    const nextQuestionId = currentAnswer[0].nextQuestionId;
    const nextQuestionIndex = qualifying.questions.findIndex((q) => q.questionId === nextQuestionId);
    setCurrentQuestionIndex(nextQuestionIndex);

    // update answer in history trace
    updatHistoryTrace(currentAnswer);
  };

  const nextQuestion = () => {
    setCurrentAnswer(null);
    setFrom('NEXT');
    const { currentQuestion } = qualifying;
    if (currentQuestion.inputType === 'radio') {
      return radioNextQuestionAction();
    }
    return checkboxNextQuestionAction();
  };

  const previous = () => {
    setCurrentAnswer(null);
    setFrom('PREV');
    // update history trace
    const updatedHistoryTrace = historyTrace.filter((q) => q.questionId !== qualifying.currentQuestion.questionId);
    setHistoryTrace(updatedHistoryTrace);

    // get previous question and current question index
    const prevQuestion = updatedHistoryTrace[updatedHistoryTrace.length - 1];
    const prevQuestionIndex = qualifying.questions.findIndex((q) => q.questionId === prevQuestion.questionId);
    setCurrentQuestionIndex(prevQuestionIndex);

    // for only radio input type
    if (prevQuestion.inputType === 'radio') {
      setNote(prevQuestion.answer.message);
    }
  };

  const handleChange = (event) => {
    setCurrentAnswer(event.target.value);
    const currentAns = qualifying.currentQuestion.options.find((o) => o.answerId === event.target.value);
    if (currentAns.next === NEXT.proceed && currentAns.message) {
      setNote(currentAns.message);
    } else {
      setNote('');
    }
  };

  // listener for checkox change
  const handleChangeCheckbox = (data) => {
    const answers = qualifying.currentQuestion.options.filter((o) => {
      const status = data[o.answerId];
      if (!status) {
        return false;
      }
      return true;
    });
    setCurrentAnswer(answers);
  };

  useEffect(() => {
    if (!qualifying.currentQuestion) {
      return;
    }
    const exist = historyTrace.find((q) => q.questionId === qualifying.currentQuestion.questionId);
    if (exist) {
      return;
    }
    setHistoryTrace((h) => [...h, qualifying.currentQuestion]);
  }, [qualifying.currentQuestion]);

  useEffect(() => {
    if (!qualifying.questions || !qualifying.currentQuestion || currentQuestionIndex < 0) {
      return;
    }

    const currQuestion = qualifying.questions[currentQuestionIndex];
    if (currQuestion.questionId === qualifying.currentQuestion.questionId) {
      return;
    }

    const myCurrentQuestion = qualifying.questions[currentQuestionIndex];
    setCurrentQuestion(myCurrentQuestion);
  }, [qualifying, currentQuestionIndex]);

  useEffect(() => {
    if (historyTrace.length === 0 && currentAnswer === null) {
      return;
    }
    if (from === 'NEXT') {
      return;
    }
    const currentQuestionAnswer = historyTrace.find((q) => q.questionId === qualifying.currentQuestion.questionId);
    // for radio
    if (currentQuestionAnswer && currentQuestionAnswer.answer && currentQuestionAnswer.inputType === 'radio') {
      setCurrentAnswer(currentQuestionAnswer.answer.answerId);
    }
    // for checkbox
    if (currentQuestionAnswer && currentQuestionAnswer.answer && currentQuestionAnswer.inputType === 'checkbox') {
      setCurrentAnswer(currentQuestionAnswer.answer);
    }
  }, [historyTrace, qualifying.currentQuestion]);

  useEffect(() => {
    // init first question
    setCurrentQuestion(qualifying.questions[currentQuestionIndex]);
  }, []);

  const renderQuestionInputType = () => {
    if (qualifying.currentQuestion.inputType === 'radio') {
      return <RadioFieldSet note={note} answer={currentAnswer} handleChange={handleChange} question={qualifying.currentQuestion} />;
    }
    return <CheckboxesGroup note={note} answer={currentAnswer} handleChange={handleChangeCheckbox} question={qualifying.currentQuestion} />;
  };

  const renderQuestion = () => (
    <section>
      <div className={classes.content}>
        { qualifying && qualifying.currentQuestion && renderQuestionInputType()}
      </div>
      <div className={classes.actionContainer}>
        <Button disabled={currentQuestionIndex === 0} onClick={previous} className={classes.actionButton} variant="contained" color="secondary">
          Previous
        </Button>
        <Button disabled={!currentAnswer || currentAnswer.length < 1} onClick={nextQuestion} className={classes.actionButton} variant="contained" color="secondary">
          Next
        </Button>
      </div>
    </section>
  );

  const renderDone = () => (
    <div>
      {completeAnswer.message}
    </div>
  );

  if (!isStarted) {
    return (
      <Card className={classes.starting}>
        <Typography variant="body2">
          HomeAssist.ph aims to provide you all the important details that can aid you in your home-buying decision. We will help you complete your real estate transaction from reservation up to after-sales. Owning your dream home just got easier. Apply Now. Fast Approval. Up to 80% of Home Value. Flexible Payment Terms. 100% Online Application. Types: House, Condominium, Townhouse, Duplex. 🙂
        </Typography>
        <Button onClick={() => setIsStarted(true)} className={classes.getStarted} variant="contained" color="primary">
          Get Started
        </Button>
      </Card>
    );
  }

  if (isFinal && completeAnswer) {
    return (
      <Card className={classes.root}>
        {renderDone()}
      </Card>
    );
  }

  return (
    <Card className={classes.root}>
      {renderQuestion()}
    </Card>
  );
};

QualifyingQuestion.propTypes = {
  setCurrentQuestion: Proptypes.func.isRequired,
  qualifying: Proptypes.object.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      qualifying: state.qualifying,
    }),
    (dispatch) => bindActionCreators({
      setCurrentQuestion: setCurrentQuestionAction,
    }, dispatch),
  ),
);

export default enhanced(QualifyingQuestion);
