import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import TextField from '../../components/Forms/TextField';
import MultipleSelectField from '../../components/Forms/MultipleSelectField';

import {
  fetchPropertiesAction,
  fetchPropertiesFetchLocationsAction,
  fetchPropertiesFetchTypesAction,
  searchPropertiesAction,
} from '../../redux/properties/properties.action';

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
  form: {
    display: 'flex',
    marginBottom: '1rem',
  },
  search: {
    color: '#fff',
  },
  formField: {
    height: '3.5rem',
    width: '12rem',
    marginRight: '1rem',
    background: '#fff',
  },
});

const PropertySearch = ({
  fetchProperties,
  fetchPropertiesFetchTypes,
  fetchPropertiesFetchLocations,
  // eslint-disable-next-line no-unused-vars
  properties,
  searchProperties,
}) => {
  const classes = useStyles();
  const [pageOptions, setPageOptions] = useState({ page: 1, pageSize: 9, q: '' });
  const [locations, setLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const initialValues = {
    term: '',
    location: [],
    propertyType: [],
    price: '',
  };

  const onSubmit = (values) => {
    let query = { page: 1, pageSize: 9, q: values.term };
    if (values.propertyType) {
      const propertyType = values.propertyType.join(',');
      query = { ...query, property_type: propertyType };
    }
    if (values.location) {
      const propertyLocation = values.location.join(',');
      query = { ...query, property_location: propertyLocation };
    }
    // searchProperties(query);
    setPageOptions(query);
  };

  const onScrollBottom = () => {
    if (properties.properties.pageCount <= pageOptions.page) {
      setPageOptions((value) => ({ ...value, page: value.page + 1, pageSize: value.pageSize }));
    }
  };

  useEffect(() => {
    fetchPropertiesFetchTypes();
    fetchPropertiesFetchLocations();
  }, []);

  useEffect(() => {
    // if coming from search button trigger, reset the propertis store
    if (pageOptions.page === 1) {
      searchProperties(pageOptions);
    } else {
      // else append to existing
      fetchProperties(pageOptions);
    }
  }, [pageOptions]);

  useEffect(() => {
    if (locations.length === 0 && properties.locations.result && properties.locations.result.length > 0) {
      const locs = properties.locations.result.map((loc) => ({ value: loc.slug, label: loc.name }));
      setLocations(locs);
    }
  }, [properties.locations]);

  useEffect(() => {
    if (propertyTypes.length === 0 && properties.types.result && properties.types.result.length > 0) {
      const types = properties.types.result.map((loc) => ({ value: loc.slug, label: loc.name }));
      setPropertyTypes(types);
    }
  }, [properties.types]);

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
      <Formik initialValues={initialValues} onSubmit={onSubmit} validator={() => ({})}>
        {({ values }) => (
          <Form className={classes.form}>
            <Field className={classes.formField} name="term" type="input" as={TextField} variant="outlined" label="Search" value={values.term} />
            <Field className={classes.formField} name="location" type="select" as={MultipleSelectField} variant="outlined" label="Location" options={locations} value={values.location} />
            <Field className={classes.formField} name="propertyType" type="select" as={MultipleSelectField} variant="outlined" label="Property Type" options={propertyTypes} value={values.propertyType} />
            <Button type="submit" variant="contained" color="primary" className={classes.search} endIcon={<SearchIcon />}>Search</Button>
          </Form>
        )}
      </Formik>
      { !properties.loading || properties.properties.result.length > 0 ? renderItems() : renderPreloader() }
      { properties.loading && properties.properties.result.length > 0 && <CircularProgress className={classes.loader} />}
    </MainLayout>
  );
};

PropertySearch.propTypes = {
  properties: PropTypes.object.isRequired,
  searchProperties: PropTypes.func.isRequired,
  fetchProperties: PropTypes.func.isRequired,
  fetchPropertiesFetchTypes: PropTypes.func.isRequired,
  fetchPropertiesFetchLocations: PropTypes.func.isRequired,
};

const enhanced = compose(
  connect(
    (state) => ({
      properties: state.properties,
    }),
    (dispatch) => bindActionCreators({
      fetchProperties: fetchPropertiesAction,
      searchProperties: searchPropertiesAction,
      fetchPropertiesFetchTypes: fetchPropertiesFetchTypesAction,
      fetchPropertiesFetchLocations: fetchPropertiesFetchLocationsAction,
    }, dispatch),
  ),
);

export default enhanced(PropertySearch);
