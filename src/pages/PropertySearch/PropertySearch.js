import React from 'react';
import { makeStyles } from '@material-ui/core';

import MainLayout from '../../components/MainLayout/MainLayout';
import ListingItem from '../../components/ListingItem/ListingItem';

const useStyles = makeStyles({
  listing: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  listingItem: {
    marginRight: 5,
  },
  title: {
    marginBottom: '1rem',
  },
});

const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PropertySearch = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <h1 className={classes.title}>Property Search</h1>
      <div className={classes.listing}>
        {properties.map((property) => (
          <ListingItem key={property} className={classes.listingItem} />
        ))}
      </div>
    </MainLayout>
  );
};

export default PropertySearch;
