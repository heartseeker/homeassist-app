import React from 'react';
import { makeStyles } from '@material-ui/core';

import MainLayout from '../../components/MainLayout.js/MainLayout';
import ListingItem from '../../components/ListingItem/ListingItem';

const useStyles = makeStyles({
  listing: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listingItem: {
    marginRight: 5,
  },
});

const properties = [1, 1, 1, 1, 1, 1, 1, 1, 1];

const PropertySearch = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <h1>Property Search</h1>
      <div className={classes.listing}>
        {properties.map(() => (
          <ListingItem className={classes.listingItem} />
        ))}
      </div>
    </MainLayout>
  );
};

export default PropertySearch;
