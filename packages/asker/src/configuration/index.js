import deepFreeze from 'deep-freeze';
import localConfigs from './local';
import devConfigs from './dev';
import prodConfigs from './prod';

let configs = {};

switch (process.env.REACT_APP_ENV) {
  case 'dev':
    configs = devConfigs;
    break;
  case 'prod':
    configs = prodConfigs;
    break;
  default:
    configs = localConfigs;
}

export default deepFreeze(configs);
