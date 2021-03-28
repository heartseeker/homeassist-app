import axios from 'axios';

const createAPI = () => {
  const options = {
    baseURL: 'https://nmkajrttqi.execute-api.ap-southeast-1.amazonaws.com/dev',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};

export default axios.create(createAPI());
