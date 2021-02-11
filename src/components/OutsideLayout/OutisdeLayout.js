import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Backdrop,
  Card,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import withAuthListener from '../../hocs/withAuthListener';
import withRedirect from '../../hocs/withRedirect';

import Logo from '../../assets/images/logo.png';

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
    // minHeight: 500,
    display: 'flex',
    justifyContent: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const OutsideLayout = ({
  auth,
  children,
}) => {
  const classes = useStyles();

  if (auth.user) {
    return null;
  }

  return (
    <main className={classes.main}>
      <div className={classes.cardContainer}>
        <img className={classes.logo} src={Logo} alt="Homeassist.ph" />
        <Card className={classes.container}>
          {children}
        </Card>
      </div>
      { auth.loading
      && (
      <Backdrop className={classes.backdrop} open={auth.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      )}
    </main>
  );
};

OutsideLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      auth: state.auth,
    }),
  ),
  withRouter,
  withAuthListener,
  withRedirect,
);

export default enhanced(OutsideLayout);
