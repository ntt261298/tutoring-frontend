import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';
import question from './question';

const reducers = {
  modal,
  user,
  question,
};
const combined = combineReducers(reducers);

export default combined;
