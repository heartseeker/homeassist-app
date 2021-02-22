import { combineReducers } from 'redux';
import auth from './auth/auth.reducer';
import qualifying from './qualifying/qualifying.reducer';
import snackbar from './snackbar/snackbar.reducer';
import properties from './properties/properties.reducer';

export default combineReducers({
  auth,
  qualifying,
  snackbar,
  properties,
});
