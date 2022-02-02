import { combineReducers } from 'redux';
import shot from './modules/shot';
import user from './modules/users';


const reducers = combineReducers({ 
  shot,
  user

});

export default reducers;
