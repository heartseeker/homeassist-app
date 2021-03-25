import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import MainLayout from '../../components/MainLayout/MainLayout';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50rem',
    alignSelf: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  tiles: {
    display: 'flex',
    marginBottom: '1rem',
  },
  cell: {
    display: 'flex',
    width: '22rem',
    height: '20rem',
    marginRight: '1rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const HomeBuyersGuide = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <div className={classes.paper}>
        <h1 className={classes.title}>Home Buyers Guide</h1>
        <div className={classes.column}>
          <div className={classes.tiles}>
            <Card className={classes.cell}>Cell</Card>
            <Card className={classes.cell}>Cell</Card>
            <Card className={classes.cell}>Cell</Card>
          </div>
          <div className={classes.tiles}>
            <Card className={classes.cell}>Cell</Card>
            <Card className={classes.cell}>Cell</Card>
            <Card className={classes.cell}>Cell</Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeBuyersGuide;
