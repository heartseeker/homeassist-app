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

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as yup from 'yup';

import { authErrorAction, authLoadingAction } from '../../redux/auth/auth.action';

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
  email: yup.string().required().email(),
});

const ForgotPassword = ({
  authError,
  authLoading,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = async (data) => {
    authLoading(true);
    try {
      await Auth.forgotPassword(data.email);
      history.push(`/users/new-password?email=${data.email}`);
      authError(null);
      authLoading(false);
    } catch (err) {
      authError(err);
      authLoading(false);
    }
  };

  return (
    <OutsideLayout>
      <div className={classes.loginContainer}>
        <Typography variant="h4">Forgot Password?</Typography>
        <Formik validateOnMount initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className={classes.form}>
              <Field name="email" type="input" as={TextField} variant="outlined" label="Email address" className={classes.email} />
              <Button
                disabled={!isValid}
                className={classes.login}
                variant="contained"
                color="primary"
                type="submit"
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </OutsideLayout>
  );
};

ForgotPassword.propTypes = {
  authError: Proptypes.func.isRequired,
  authLoading: Proptypes.func.isRequired,
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

export default enhanced(ForgotPassword);
