import ApiService from './api.service';

const propertyService = {
  /* eslint-disable */
  getProperties: ({ page, pageSize, q, property_type, property_location }) => ApiService.get('/properties', { params: { page, pageSize, q, property_type, property_location } }),
  /* eslint-enable */
  getPropertyTypes: () => ApiService.get('/property-types'),
  getPropertyLocations: () => ApiService.get('/property-locations'),
};

export default propertyService;
