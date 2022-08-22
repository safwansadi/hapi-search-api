'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cryptoRandomString = require('crypto-random-string');
const _ = require('lodash');
const { getInvalidFileTypeMessage } = require('../utils/validation');
const logger = require('../utils/logger');

module.exports = {
  getFileRandomName: () =>
    cryptoRandomString({
      length: 16,
      type: 'url-safe',
    }),

  getFileExtension: (fileName) => {
    if (!fileName) return null;

    const tempArray = _.split(fileName, '.');
    return tempArray[_.size(tempArray) - 1];
  },

  saveTempFile: async (file, fileName, fileExtension) => {
    const dirPath = path.join(__dirname, '../', '../', 'temp');

    return new Promise((resolve, reject) => {
      fs.mkdirSync(dirPath, {
        recursive: true,
      });

      const filePath = `${dirPath}/${fileName}.${fileExtension}`;

      const fileStream = fs.createWriteStream(filePath);

      file.on('start', (e) => {
        if (e) {
          logger.error('file.js: file.on -> start', e);
          reject(e);
        }
      });

      file.pipe(fileStream);

      file.on('end', (e) => {
        if (e) {
          logger.error('file.js: file.on -> end', e);
          reject(e);
        }

        resolve(true);
      });
    });
  },

  getTempFile: (fileName, fileExtension) => {
    const dirPath = path.join(__dirname, '../', '../', 'temp');
    const filePath = `${dirPath}/${fileName}.${fileExtension}`;

    return fs.createReadStream(filePath);
  },

  deleteTempFile: async (fileName, fileExtension) => {
    const dirPath = path.join(__dirname, '../', '../', 'temp');
    const filePath = `${dirPath}/${fileName}.${fileExtension}`;

    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (e) => {
        if (e) {
          logger.error('file.js', e);
          reject(e);
        }

        resolve(true);
      });
    });
  },

  getCsvContentsFromTempFile: async (fileName, fileExtension) => {
    const dirPath = path.join(__dirname, '../', '../', 'temp');
    const filePath = `${dirPath}/${fileName}.${fileExtension}`;
    const fileContents = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => fileContents.push(data))
        .on('end', () => {
          resolve(fileContents);
        })
        .on('error', (error) => reject(error));
    });
  },

  checkFileValidation: (file) => {
    if (!file) return null;

    const invalidFileTypeMessage = getInvalidFileTypeMessage(file, [
      'jpeg',
      'jpg',
      'png',
    ]);

    if (invalidFileTypeMessage)
      throw {
        name: 'badRequest',
        message: _.upperFirst(invalidFileTypeMessage),
      };
    else return file;
  },
};
