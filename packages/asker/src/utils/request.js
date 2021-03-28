import { RequestUtil } from '@tutoring/commons/utils';
import config from 'configuration';
import auth from './auth';

const defaultHeaders = {
  'X-User-Token': auth.getToken(),
};

const { apiUrl } = config;

const request = new RequestUtil({
  auth,
  apiUrl,
  defaultHeaders,
  tokenType: '',
  shouldAddBreadCrumb: false,
});

const toAPI = {
  get: request.get,
  post: request.post,
  put: request.put,
  del: request.del,
  upload: request.upload,
};

export default {
  toAPI,
};
