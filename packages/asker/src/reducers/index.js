import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';

const reducers = {
  modal,
  user,
};
const combined = combineReducers(reducers);

export default combined;
