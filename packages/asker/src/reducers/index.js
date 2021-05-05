import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';
import subscription from './subscription';
import userSubscription from './userSubscription';
import question from './question';

const reducers = {
  modal,
  user,
  subscription,
  userSubscription,
  question,
};
const combined = combineReducers(reducers);

export default combined;
