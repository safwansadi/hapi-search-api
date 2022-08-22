'use strict';

const { POST } = require('./api');
const { API_BASE_URL, EVENT_STORAGE_ENDPOINT } = require('../utils/env');
const logger = require('../utils/logger');
const _ = require('lodash');

const tag = 'lib/event-storage.js';

module.exports = {
  captureActivities: async (payload, token) => {
    try {
      return await POST(
        `${API_BASE_URL}${EVENT_STORAGE_ENDPOINT}/api/v1/activities`,
        payload,
        token
      );
    } catch (error) {
      logger.error(tag + ': captureActivities', error);
    }
  },
};
