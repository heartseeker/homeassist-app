import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  card: {
    minWidth: 345,
    maxWidth: 345,
    marginRight: 20,
    marginBottom: 20,
  },
  media: {
    height: 200,
  },
});

const PropertyListItemSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        action={null}
        title={(
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        )}
        subheader={<Skeleton animation="wave" height={10} width="50%" />}
      />
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
        <>
          <Skeleton animation="wave" height={30} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={30} width="80%" />
          <Skeleton animation="wave" height={30} width="80%" />
        </>
      </CardContent>
    </Card>
  );
};

export default PropertyListItemSkeleton;
