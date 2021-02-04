import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, makeStyles } from '@material-ui/core';

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
  children,
}) => {
  const classes = useStyles();
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
  children: PropTypes.node.isRequired,
};

export default MainLayout;
