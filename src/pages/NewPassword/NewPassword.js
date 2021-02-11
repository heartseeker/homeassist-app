import React from 'react';
import {
  useHistory,
  useLocation,
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

import {
  authErrorAction,
  authSuccessAction,
  authLoadingAction,
} from '../../redux/auth/auth.action';

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
  password: yup.string().required(),
});

const NewPassword = ({
  authError,
  authSuccess,
  authLoading,
}) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const onSubmit = async (data) => {
    authLoading(true);
    const search = new URLSearchParams(location.search);
    const email = search.get('email');
    try {
      await Auth.forgotPasswordSubmit(email, data.authCode, data.password);
      authLoading(false);
      authSuccess({
        message: 'Password has been reset successfully',
      });
      authError(null);
      history.push('/users/signin');
    } catch (err) {
      authLoading(false);
      authError(err);
    }
  };

  return (
    <OutsideLayout>
      <div className={classes.loginContainer}>
        <Typography variant="h4">Password Confirmation</Typography>
        <Formik validateOnMount initialValues={{ authCode: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form className={classes.form}>
              <Field name="authCode" type="input" as={TextField} variant="outlined" label="Security Code" className={classes.email} />
              <Field name="password" type="password" as={TextField} variant="outlined" label="New Password" className={classes.email} />
              <Button
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

NewPassword.propTypes = {
  authError: Proptypes.func.isRequired,
  authSuccess: Proptypes.func.isRequired,
  authLoading: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authError: authErrorAction,
      authSuccess: authSuccessAction,
      authLoading: authLoadingAction,
    }, dispatch),
  ),
);

export default enhanced(NewPassword);
