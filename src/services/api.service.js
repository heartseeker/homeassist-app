import axios from 'axios';
import { API_URL } from '../config/server';

const createAPI = () => {
  const options = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};

export default axios.create(createAPI());
