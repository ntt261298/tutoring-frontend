import { Auth } from '@tutoring/commons/utils';
import storage from './storage';

const AUTH_KEY = 'authentication';
const auth = new Auth(storage, AUTH_KEY);

export default auth;
