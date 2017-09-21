import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as form } from 'redux-form';


const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;
