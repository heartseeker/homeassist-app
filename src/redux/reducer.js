import { combineReducers } from 'redux';
import auth from './auth/auth.reducer';
import qualifying from './qualifying/qualifying.reducer';

export default combineReducers({
  auth,
  qualifying,
});
