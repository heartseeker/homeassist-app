import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import TextField from '../../components/Forms/TextField';
import MultipleSelectField from '../../components/Forms/MultipleSelectField';
import SelectField from '../../components/Forms/SelectField';

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

const locations = [
  { value: 'Manila', label: 'Manila City' },
  { value: 'Makati', label: 'Makati City' },
  { value: 'QC', label: 'Quezon City' },
  { value: 'Mandaluyung', label: 'Mandaluyong City' },
  { value: 'Pasay', label: 'Pasay City' },
  { value: 'Pasig', label: 'Pasig City' },
  { value: 'Paranaque', label: 'Paranaque City' },
  { value: 'Malabon', label: 'Malabon City' },
  { value: 'Caloocan', label: 'Caloocan City' },
  { value: 'Taguig', label: 'Taguig City' },
  { value: 'San juan', label: 'San juan City' },
  { value: 'Bulacan', label: 'Bulacan' },
  { value: 'Tagaytay', label: 'Tagaytay' },
  { value: 'Batangas', label: 'Batangas' },
  { value: 'Cavite', label: 'Cavite' },
];

const propertyTypes = [
  { value: 'Commercial', label: 'Commercial Space' },
  { value: 'Condominium', label: 'Condominium' },
  { value: 'House', label: 'House & Lot' },
  { value: 'Lot', label: 'Lot Only' },
  { value: 'Office', label: 'Office Space' },
  { value: 'Townhouse', label: 'Townhouse' },
];

const prices = [
  { value: 500000, label: '₱500,000' },
  { value: 1000000, label: '₱1,000,000' },
  { value: 2000000, label: '₱2,000,000' },
  { value: 3000000, label: '₱3,000,000' },
  { value: 4000000, label: '₱4,000,000' },
];

const PropertySearch = ({
  fetchProperties,
  // eslint-disable-next-line no-unused-vars
  properties,
}) => {
  const classes = useStyles();
  const [pageOptions, setPageOptions] = useState({ page: 1, pageSize: 9 });
  const initialValues = {
    term: '',
    location: [],
    propertyType: [],
    price: '',
  };

  const onSubmit = (values) => {
    console.log('values', values);
  };

  const onScrollBottom = () => {
    if (properties.properties.pageCount <= pageOptions.page) {
      setPageOptions((value) => ({ page: value.page + 1, pageSize: value.pageSize }));
    }
  };

  const getProperties = async () => {
    fetchProperties(pageOptions);
  };

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
      <Formik initialValues={initialValues} onSubmit={onSubmit} validator={() => ({})}>
        {({ values }) => (
          <Form className={classes.form}>
            <Field className={classes.formField} name="term" type="input" as={TextField} variant="outlined" label="Search" value={values.term} />
            <Field className={classes.formField} name="location" type="select" as={MultipleSelectField} variant="outlined" label="Location" options={locations} value={values.location} />
            <Field className={classes.formField} name="propertyType" type="select" as={MultipleSelectField} variant="outlined" label="Property Type" options={propertyTypes} value={values.propertyType} />
            <Field className={classes.formField} name="price" type="select" as={SelectField} variant="outlined" label="Prices From" options={prices} value={values.price} />
            <Button type="submit" variant="contained" color="primary" className={classes.search}>Search</Button>
          </Form>
        )}
      </Formik>
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
