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

export const {
  get, post, put, del, upload,
} = request;
