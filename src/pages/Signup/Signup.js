import React from 'react';
import {
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

import * as yup from 'yup';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { authLoadingAction, authErrorAction } from '../../redux/auth/auth.action';

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
  mb20: {
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
  givenName: yup.string().required('Given name is required'),
  familyName: yup.string().required('Family name is required'),
  email: yup.string().required('Email address is required').email(),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Repeat Password is required').when('password', {
    is: (val) => val && val.length > 0,
    then: yup.string().oneOf(
      [yup.ref('password')],
      'Password does not match',
    ),
  }),
});

const Signup = ({
  // eslint-disable-next-line no-unused-vars
  auth,
  authError,
  authLoading,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const initialValues = {
    givenName: '',
    familyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (data) => {
    const {
      givenName,
      familyName,
      email,
      password,
    } = data;
    authLoading(true);
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email, given_name: givenName, family_name: familyName },
      });
      authLoading(false);
      authError(null);
      history.push(`/users/confirm-signup?email=${email}`);
    } catch (err) {
      authError(err);
      authLoading(false);
    }
  };

  return (
    <OutsideLayout>
      <div className={classes.loginContainer}>
        <Typography variant="h4">Sign up</Typography>
        <Formik validateOnMount initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className={classes.form}>
              <Field name="givenName" type="input" as={TextField} variant="outlined" label="Given name" className={classes.mb20} />
              <Field name="familyName" type="input" as={TextField} variant="outlined" label="Family name" className={classes.mb20} />
              <Field name="email" type="input" as={TextField} variant="outlined" label="Email address" className={classes.mb20} />
              <Field name="password" type="password" as={TextField} variant="outlined" label="Password" className={classes.mb20} />
              <Field name="confirmPassword" type="password" as={TextField} variant="outlined" label="Confirm Password" />
              <Button
                disabled={!isValid}
                className={classes.login}
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign up
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
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authLoading: authLoadingAction,
      authError: authErrorAction,
    }, dispatch),
  ),
);

export default enhanced(Signup);
