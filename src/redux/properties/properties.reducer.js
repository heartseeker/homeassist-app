import {
  PROPERTIES_FETCH,
  PROPERTIES_FETCH_LOADING,
  PROPERTIES_SEARCH,
  PROPERTIES_RESET_STATE,
  PROPERTIES_FETCH_TYPES,
  PROPERTIES_FETCH_LOCATIONS,
  PROPERTIES_SET_ERROR,
} from './properties.action-types';

const INITIAL_STATE = {
  error: null,
  loading: false,
  locations: [],
  properties: {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    rowCount: 0,
    result: [],
  },
  types: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PROPERTIES_FETCH:
      return { ...state, properties: { ...payload, result: state.properties.result.concat(payload.result) } };
    case PROPERTIES_FETCH_LOADING:
      return { ...state, loading: payload };
    case PROPERTIES_SEARCH:
      return { ...state, properties: { ...payload, result: payload.result } };
    case PROPERTIES_FETCH_TYPES:
      return { ...state, types: payload };
    case PROPERTIES_FETCH_LOCATIONS:
      return { ...state, locations: payload };
    case PROPERTIES_SET_ERROR:
      return { ...state, error: payload };
    case PROPERTIES_RESET_STATE:
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};
