import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as yup from 'yup';
import { authLoginAction } from '../../redux/auth/auth.action';

import TextField from '../../components/Forms/TextField';

import { palette } from '../../styles/theme';
import Logo from '../../assets/images/logo.png';
import Facebook from '../../assets/images/facebook.png';
import Google from '../../assets/images/google.png';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'center',
    height: '95vh',
  },
  cardContainer: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    marginBottom: 20,
  },
  container: {
    width: 550,
    minHeight: 500,
    display: 'flex',
    justifyContent: 'center',
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const Signin = ({
  auth,
  authLogin,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (data) => {
    authLogin(data);
  };

  useEffect(() => {
    if (auth.email) {
      localStorage.setItem('isLogin', '1');
      history.push('/property-search');
    }
  }, [auth.email]);

  return (
    <main className={classes.main}>
      <div className={classes.cardContainer}>
        <img className={classes.logo} src={Logo} alt="Homeassist.ph" />
        <Card className={classes.container}>
          <div className={classes.loginContainer}>
            <Typography variant="h4">Log in</Typography>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
              {() => (
                <Form className={classes.form}>
                  <Field name="email" type="input" as={TextField} variant="outlined" label="Email address" className={classes.email} />
                  <Field name="password" type="password" as={TextField} variant="outlined" label="Password" />
                  <Button
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
              <img src={Facebook} alt="Facebook" style={{ marginRight: 20, cursor: 'pointer' }} />
              <img src={Google} alt="Google" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </Card>
      </div>
      <Backdrop className={classes.backdrop} open={auth.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  );
};

Signin.propTypes = {
  auth: Proptypes.object.isRequired,
  authLogin: Proptypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
    (dispatch) => bindActionCreators({
      authLogin: authLoginAction,
    }, dispatch),
  ),
);

export default enhanced(Signin);
