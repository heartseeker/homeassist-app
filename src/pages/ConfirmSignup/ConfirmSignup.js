import React, { useState, useEffect } from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import Proptypes from 'prop-types';
import {
  Formik,
  Field,
  Form,
} from 'formik';
import {
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';

import '../../configureAmplify';
import { Auth } from 'aws-amplify';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as yup from 'yup';

import { authErrorAction, authLoadingAction, authSuccessAction } from '../../redux/auth/auth.action';

import OutsideLayout from '../../components/OutsideLayout/OutisdeLayout';
import TextField from '../../components/Forms/TextField';

import { palette } from '../../styles/theme';

const useStyles = makeStyles(() => ({
  loginContainer: {
    padding: 25,
    textAlign: 'center',
    width: '100%',
  },
  form: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  email: {
    marginBottom: 20,
  },
  login: {
    color: '#fff',
    width: '100%',
    height: 50,
    marginTop: 20,
    marginBottom: 40,
  },
  signup: {
    color: palette.primary.main,
  },
  create: {
    marginTop: 20,
  },
  social: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const validationSchema = yup.object({
  authCode: yup.string().required(),
});

const Signup = ({
  // eslint-disable-next-line no-unused-vars
  auth,
  authLoading,
  authError,
  authSuccess,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const [emailQuery, setEmailQuery] = useState(null);

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setEmailQuery(search.get('email'));
  }, []);

  const onSubmit = async (data) => {
    authLoading(true);
    try {
      await Auth.confirmSignUp(emailQuery, data.authCode);
      authError(null);
      authLoading(false);
      authSuccess({ message: 'Thanks! your account has been created successfully.' });
      history.push('/users/signin');
    } catch (err) {
      authError(err);
      authLoading(false);
    }
  };

  return (
    <OutsideLayout>
      <div className={classes.loginContainer}>
        <Typography variant="h4">Confirm Signup</Typography>
        <Typography variant="body2">
          We sent and email to&nbsp;
          <strong>{emailQuery}</strong>
          {' '}
          to make sure you own it. Please check your inbox and enter the security code below.
        </Typography>
        <Formik validateOnMount initialValues={{ authCode: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className={classes.form}>
              <Field name="authCode" type="input" as={TextField} variant="outlined" label="Authentication Code" className={classes.email} />
              <Button
                disabled={!isValid}
                className={classes.login}
                variant="contained"
                color="primary"
                type="submit"
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </OutsideLayout>
  );
};

Signup.propTypes = {
  auth: Proptypes.object.isRequired,
  authLoading: Proptypes.func.isRequired,
  authError: Proptypes.func.isRequired,
  authSuccess: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authLoading: authLoadingAction,
      authError: authErrorAction,
      authSuccess: authSuccessAction,
    }, dispatch),
  ),
);

export default enhanced(Signup);
