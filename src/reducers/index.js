import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorReducer';
import customerReducer from './customerReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  customer: customerReducer
});