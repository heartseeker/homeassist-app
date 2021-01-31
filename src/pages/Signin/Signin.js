import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import { palette } from '../../styles/theme';
import Logo from '../../assets/images/logo.png';
import Facebook from '../../assets/images/facebook.png';
import Google from '../../assets/images/google.png';

const useStyles = makeStyles({
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
    height: 500,
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
});

const Signin = () => {
  const classes = useStyles();
  const history = useHistory();
  const login = () => {
    history.push('/property-search');
  };

  return (
    <main className={classes.main}>
      <div className={classes.cardContainer}>
        <img className={classes.logo} src={Logo} alt="Homeassist.ph" />
        <Card className={classes.container}>
          <div className={classes.loginContainer}>
            <Typography variant="h4">Log in</Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <TextField label="Email address" variant="outlined" className={classes.email} />
              <TextField label="Password" variant="outlined" type="password" />
            </form>
            <Button
              className={classes.login}
              variant="contained"
              color="primary"
              onClick={login}
            >
              Login
            </Button>
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
    </main>
  );
};

export default Signin;
