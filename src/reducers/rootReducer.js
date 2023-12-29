import {combineReducers} from '@reduxjs/toolkit';
import subReducer from './subReducer';
import handleReducer from './handleReducer';

const rootReducer = combineReducers({
  subs: subReducer,
  han : handleReducer
  
});

export default rootReducer;
