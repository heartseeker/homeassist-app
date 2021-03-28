import axios from 'axios';

const createAPI = () => {
  const options = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};

export default axios.create(createAPI());
