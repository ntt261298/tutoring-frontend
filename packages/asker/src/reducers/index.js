import { combineReducers } from 'redux';
import modal from './modal';
import user from './user';
import subscription from './subscription';
import userSubscription from './userSubscription';

const reducers = {
  modal,
  user,
  subscription,
  userSubscription,
};
const combined = combineReducers(reducers);

export default combined;
