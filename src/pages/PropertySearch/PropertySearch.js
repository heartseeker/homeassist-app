import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { fetchPropertiesAction } from '../../redux/properties/properties.action';

import MainLayout from '../../components/MainLayout/MainLayout';
import ListingItem from '../../components/ListingItem/ListingItem';
import PropertyListItemSkeleton from '../../components/PropertyListItemSkeleton/PropertyListItemSkeleton';

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
  loader: {
    alignSelf: 'center',
  },
});

// const properties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PropertySearch = ({
  fetchProperties,
  // eslint-disable-next-line no-unused-vars
  properties,
}) => {
  const classes = useStyles();
  const [pageOptions, setPageOptions] = useState({ page: 1, pageSize: 9 });

  const onScrollBottom = () => {
    if (properties.properties.pageCount <= pageOptions.page) {
      setPageOptions((value) => ({ page: value.page + 1, pageSize: value.pageSize }));
    }
  };

  const getProperties = async () => {
    fetchProperties(pageOptions);
  };

  // useEffect(() => {
  //   getProperties();
  // }, []);

  useEffect(() => {
    getProperties();
  }, [pageOptions]);

  const renderItems = () => (
    <div className={classes.listing}>
      {properties.properties && properties.properties.result && properties.properties.result.map((property) => (
        <ListingItem property={property} key={property.ID} className={classes.listingItem} />
      ))}
    </div>
  );

  const renderPreloader = () => {
    const dummies = [...Array(9).keys()];
    return (
      <div className={classes.listing}>
        {dummies.map((property) => (
          <PropertyListItemSkeleton key={property} />
        ))}
      </div>
    );
  };

  return (
    <MainLayout onScrollBottom={onScrollBottom}>
      <h1 className={classes.title}>Property Search</h1>
      { properties.properties && properties.properties.result.length > 0 ? renderItems() : renderPreloader() }
      { properties.loading && <CircularProgress className={classes.loader} />}
    </MainLayout>
  );
};

PropertySearch.propTypes = {
  properties: PropTypes.object.isRequired,
  fetchProperties: PropTypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      properties: state.properties,
    }),
    (dispatch) => bindActionCreators({
      fetchProperties: fetchPropertiesAction,
    }, dispatch),
  ),
);

export default enhanced(PropertySearch);
