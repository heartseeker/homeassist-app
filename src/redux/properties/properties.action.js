import { PROPERTIES_FETCH, PROPERTIES_FETCH_LOADING } from './properties.action-types';
import propertyService from '../../services/property.service';

const fetchProperties = (payload) => ({
  type: PROPERTIES_FETCH,
  payload,
});

const fetchPropertiesLoading = (payload) => ({
  type: PROPERTIES_FETCH_LOADING,
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
