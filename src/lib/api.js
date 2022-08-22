'use strict';

const axios = require('../config/axios')();
const _ = require('lodash');

const getHeaders = (token, contentType) => {
  return {
    'Content-Type': !contentType ? 'application/json' : contentType,
    Authorization: !_.isUndefined(token) && !_.isNull(token) ? token : null,
  };
};

module.exports = {
  POST: async (uri, payload, token, contentType) => {
    return axios.post(uri, payload, {
      headers: getHeaders(token, contentType),
    });
  },

  GET: async (uri, token) => {
    return axios.get(uri, {
      headers: getHeaders(token),
    });
  },

  PUT: async (uri, payload, token, contentType) => {
    return axios.put(uri, payload, {
      headers: getHeaders(token, contentType),
    });
  },

  DELETE: async (uri, token) => {
    return axios.delete(uri, {
      headers: getHeaders(token),
    });
  },
};
