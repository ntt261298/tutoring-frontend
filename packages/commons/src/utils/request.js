import QueryString from 'query-string';
import caseConverter from './caseConverter';

const defaultCaseConverter = {
  camelCaseToSnakeCase: data => data,
  snakeCaseToCamelCase: data => data,
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate',
};

function ServerAPIError(json) {
  this.name = 'ServerAPIError';
  this.data = json;
  this.stack = (new Error()).stack;
}
ServerAPIError.prototype = Object.create(Error.prototype);
ServerAPIError.prototype.constructor = ServerAPIError;

export default class RequestUtil {
  constructor(...args) {
    if (args.length === 0 || args.length !== 1) {
      throw new Error('Request constructor accepts only one parameter, which is a config object.');
    }

    const {
      auth,
      apiUrl,
      shouldConvertCase = true,
      defaultHeaders: headers = {},
      tokenType,
    } = args[0];

    this.auth = auth;
    this.apiUrl = apiUrl;
    this.caseConverter = shouldConvertCase ? caseConverter : defaultCaseConverter;
    this.defaultHeaders = { ...defaultHeaders, ...headers };
    this.tokenType = tokenType || 'Bearer';
  }

  // data.A.data.B.data.C => A.B.C
  removeDataProperty = (obj) => {
    // if obj is primitive types
    if (
      obj === null
      || obj === undefined
      || typeof obj !== 'object'
    ) {
      return obj;
    }

    // if argument is an array, recursive this function with each element of array
    if (Array.isArray(obj)) {
      const newArray = [];
      obj.forEach((element) => {
        const value = this.removeDataProperty(element);
        newArray.push(value);
      });
      return newArray;
    }

    // if argument is a normal object
    const keys = Object.keys(obj);
    if (keys.length === 1 && keys[0] === 'data') {
      return this.removeDataProperty(obj.data);
    }
    const newObject = {};
    keys.forEach((key) => {
      newObject[key] = this.removeDataProperty(obj[key]);
    });
    return newObject;
  };

  updateDefaultHeaders = (newDefaultHeaders) => {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...newDefaultHeaders,
    };
  }

  request = async (url, method, body, customHeaders = {}) => {
    let endpoint = url;
    if (!url.startsWith('http')) {
      endpoint = this.apiUrl + url;
    }
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    const token = this.auth?.getToken();
    if (token) {
      // Set empty Bearer can cause setRequestHeader error in old safari version
      headers.Authorization = `${this.tokenType} ${token}`;
    }
    let data = null;
    if (body) {
      if (headers['Content-Type'] === 'application/json') {
        data = JSON.stringify(this.caseConverter.camelCaseToSnakeCase(body));
      } else {
        delete headers['Content-Type'];
        data = body;
      }
    } else {
      delete headers['Content-Type'];
    }

    const fetchOpts = {
      method,
      headers,
    };
    if (method !== 'HEAD' && method !== 'GET') {
      fetchOpts.body = data;
    }


    const response = await fetch(endpoint, fetchOpts);

    let json = await response.json();
    json = this.removeDataProperty(json);
    json = this.caseConverter.snakeCaseToCamelCase(json);

    if (response.status < 200 || response.status >= 300) {
      if (json) {
        throw new ServerAPIError(json);
      } else {
        throw new Error(response.statusText);
      }
    }

    return json;
  };

  get = (endpoint, params, headers = {}) => {
    let url = endpoint;
    if (params) {
      url += `?${QueryString.stringify(this.caseConverter.camelCaseToSnakeCase(params))}`;
    }
    return this.request(url, 'GET', null, headers);
  }

  post = (endpoint, body, headers = {}) => (
    this.request(endpoint, 'POST', body, headers)
  )

  put = (endpoint, body, headers = {}) => (
    this.request(endpoint, 'PUT', body, headers)
  )

  del = (endpoint, body, headers = {}) => (
    this.request(endpoint, 'DELETE', body, headers)
  )

  upload = (file, headers = {}) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.post(
      '/uploads',
      formData,
      {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    );
  }
}
