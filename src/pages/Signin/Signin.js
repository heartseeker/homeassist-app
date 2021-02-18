import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
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
  authCalledAction,
  authErrorAction,
  authLoadingAction,
  authSetUserAction,
} from '../../redux/auth/auth.action';

import OutsideLayout from '../../components/OutsideLayout/OutisdeLayout';
import TextField from '../../components/Forms/TextField';

import { palette } from '../../styles/theme';
import Facebook from '../../assets/images/facebook.png';
import Google from '../../assets/images/google.png';

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
  forgotText: {
    color: palette.secondary.main,
  },
  forgotPassword: {
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'flex-end',
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
  email: yup.string().required('Email address is required').email(),
  password: yup.string().required('Password is required'),
});

const Signin = ({
  // eslint-disable-next-line no-unused-vars
  auth,
  authLoading,
  authCalled,
  authError,
  authSetUser,
}) => {
  const classes = useStyles();

  const onSubmit = async (data) => {
    const { email, password } = data;
    authLoading(true);
    try {
      const userData = await Auth.signIn(email, password);
      authSetUser(userData);
      authError(null);
      authLoading(false);
      authCalled();
    } catch (err) {
      authCalled();
      authError(err);
      authLoading(false);
    }
  };

  return (
    <OutsideLayout>
      <div className={classes.loginContainer}>
        <Typography variant="h4">Log in</Typography>
        <Formik validateOnMount initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className={classes.form}>
              <Field name="email" type="input" as={TextField} variant="outlined" label="Email address" className={classes.email} />
              <Typography className={classes.forgotPassword} variant="body2">
                <Link className={classes.forgotText} to="/users/forgot-password">Forgot Password?</Link>
              </Typography>
              <Field name="password" type="password" as={TextField} variant="outlined" label="Password" />
              <Button
                disabled={!isValid}
                className={classes.login}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2">
          Don&apos;t have an account?&nbsp;
          <Link className={classes.signup} to="/users/signup">Signup here</Link>
        </Typography>
        <Typography className={classes.create} variant="body2">
          Or create account using social media
        </Typography>
        <div className={classes.social}>
          <Button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })} style={{ marginRight: 20 }}>
            <img src={Facebook} alt="Facebook" />
          </Button>
          <Button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
            <img src={Google} alt="Google" />
          </Button>
        </div>
      </div>
    </OutsideLayout>
  );
};

Signin.propTypes = {
  auth: Proptypes.object.isRequired,
  authLoading: Proptypes.func.isRequired,
  authCalled: Proptypes.func.isRequired,
  authError: Proptypes.func.isRequired,
  authSetUser: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authLoading: authLoadingAction,
      authSetUser: authSetUserAction,
      authCalled: authCalledAction,
      authError: authErrorAction,
    }, dispatch),
  ),
);

export default enhanced(Signin);
