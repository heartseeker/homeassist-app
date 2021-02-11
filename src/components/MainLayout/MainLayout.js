import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { CssBaseline, makeStyles } from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import withAuthListener from '../../hocs/withAuthListener';
import withAuth from '../../hocs/withAuth';

import AppBarDrawer from '../AppBarDrawer/AppBarDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  childContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const MainLayout = ({
  auth,
  children,
}) => {
  const classes = useStyles();

  if (!auth.user) {
    return null;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBarDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.childContent}>
          {children}
        </div>
      </main>
    </div>
  );
};

MainLayout.propTypes = {
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
  withAuth,
);

export default enhanced(MainLayout);
