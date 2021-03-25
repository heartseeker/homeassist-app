import ApiService from './api.service';

const propertyService = {
  getProperties: ({ page, pageSize }) => ApiService.get('/properties', { params: { page, pageSize } }),
};

export default propertyService;
