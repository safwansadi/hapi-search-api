'use strict';

const _ = require('lodash');

module.exports = {
  options: {
    // if true then return with first error, if false then return with all the error
    abortEarly: false,
  },

  regex: {
    phone: /^\+8801[356789]{1}\d{8}$/,
    username: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
    password: /^[\s\S]{6,32}?$/,
  },

  getInvalidFileTypeMessage(file, allowedExts) {
    if (file.hapi && file.hapi.filename && file.hapi.headers) {
      // console.debug(file, file.hapi.headers['content-type']);

      if (
        !_.some(allowedExts, (ext) =>
          _.includes(file.hapi.headers['content-type'], ext)
        )
      ) {
        return `Attached file should be ${allowedExts.join(' or ')} format.`;
      }
    }

    return null;
  },
};
