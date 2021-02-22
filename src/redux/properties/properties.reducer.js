import { PROPERTIES_FETCH, PROPERTIES_FETCH_LOADING } from './properties.action-types';

const INITIAL_STATE = {
  properties: {
    page: 1,
    pageSize: 9,
    pageCount: 0,
    rowCount: 0,
    result: [],
  },
  loading: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PROPERTIES_FETCH:
      return { ...state, properties: { ...payload, result: state.properties.result.concat(payload.result) } };
    case PROPERTIES_FETCH_LOADING:
      return { ...state, loading: payload };
    default:
      return INITIAL_STATE;
  }
};
