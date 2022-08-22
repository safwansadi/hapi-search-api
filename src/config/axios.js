const axios = require('axios');
const https = require('https');
const _ = require('lodash');
const { API_BASE_URL } = require('../utils/env');
const logger = require('../utils/logger');

const timeout = 10000;
const validateStatus = (status) => status >= 200 && status < 300;
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout,
    validateStatus,
    httpsAgent,
  });

  instance.defaults.onDownloadProgress = (progressEvent) => {};

  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      logger.debug(
        'axios.js',
        _.pick(response, ['status', 'statusText', 'headers', 'config', 'data'])
      );

      return response.data;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      !error.response
        ? logger.error('axios.js', error)
        : logger.error(
            'axios.js',
            _.pick(error.response, [
              'status',
              'statusText',
              'headers',
              'config',
              'data',
            ])
          );

      return error.response && error.response.data
        ? error.response.data
        : error.response;
    }
  );

  return instance;
};
