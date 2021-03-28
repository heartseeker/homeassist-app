import {
  PROPERTIES_FETCH,
  PROPERTIES_FETCH_LOADING,
  PROPERTIES_SEARCH,
  PROPERTIES_RESET_STATE,
  PROPERTIES_FETCH_TYPES,
  PROPERTIES_FETCH_LOCATIONS,
  PROPERTIES_SET_ERROR,
} from './properties.action-types';
import propertyService from '../../services/property.service';

const fetchProperties = (payload) => ({
  type: PROPERTIES_FETCH,
  payload,
});

const fetchPropertiesLoading = (payload) => ({
  type: PROPERTIES_FETCH_LOADING,
  payload,
});

const searchProperties = (payload) => ({
  type: PROPERTIES_SEARCH,
  payload,
});

const resetPropertiesState = (payload) => ({
  type: PROPERTIES_RESET_STATE,
  payload,
});

const fetchPropertiesFetchTypes = (payload) => ({
  type: PROPERTIES_FETCH_TYPES,
  payload,
});

const fetchPropertiesFetchLocations = (payload) => ({
  type: PROPERTIES_FETCH_LOCATIONS,
  payload,
});

const setPropertiesError = (payload) => ({
  type: PROPERTIES_SET_ERROR,
  payload,
});

export const fetchPropertiesAction = (payload) => async (dispatch) => {
  dispatch(fetchPropertiesLoading(true));
  try {
    const response = await propertyService.getProperties(payload);
    dispatch(fetchProperties(response.data));
    dispatch(fetchPropertiesLoading(false));
  } catch (err) {
    dispatch(fetchPropertiesLoading(false));
  }
};

export const fetchPropertiesFetchTypesAction = () => async (dispatch) => {
  dispatch(fetchPropertiesLoading(true));
  try {
    const response = await propertyService.getPropertyTypes();
    dispatch(fetchPropertiesFetchTypes(response.data));
    dispatch(fetchPropertiesLoading(false));
  } catch (err) {
    dispatch(setPropertiesError(err));
    dispatch(fetchPropertiesLoading(false));
  }
};

export const fetchPropertiesFetchLocationsAction = () => async (dispatch) => {
  dispatch(fetchPropertiesLoading(true));
  try {
    const response = await propertyService.getPropertyLocations();
    dispatch(fetchPropertiesFetchLocations(response.data));
    dispatch(fetchPropertiesLoading(false));
  } catch (err) {
    dispatch(setPropertiesError(err));
    dispatch(fetchPropertiesLoading(false));
  }
};

export const searchPropertiesAction = (payload) => async (dispatch) => {
  dispatch(resetPropertiesState());
  dispatch(fetchPropertiesLoading(true));
  try {
    const response = await propertyService.getProperties(payload);
    dispatch(searchProperties(response.data));
    dispatch(fetchPropertiesLoading(false));
  } catch (err) {
    dispatch(fetchPropertiesLoading(false));
  }
};
