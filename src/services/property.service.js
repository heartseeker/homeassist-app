import ApiService from './api.service';

const propertyService = {
  getProperties: ({ page, pageSize }) => ApiService.get('/item', { params: { page, pageSize } }),
};

export default propertyService;
