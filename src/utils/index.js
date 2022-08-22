'use strict';

const FormData = require('form-data');
const { POST, DELETE } = require('../lib/api');
const {
  saveTempFile,
  deleteTempFile,
  checkFileValidation,
  getFileExtension,
  getFileRandomName,
  getTempFile,
} = require('./file');
const { STORAGE_BASE_URL } = require('./env');
const logger = require('./logger');
const _ = require('lodash');

const add = async (folderName, file, fileName, fileExtension, token = null) => {
  if (!folderName || !file || !fileName | fileExtension) return false;

  await saveTempFile(file, fileName, fileExtension);

  const formData = new FormData();

  formData.append('folderName', folderName);
  formData.append('fileName', fileName);
  formData.append('file', getTempFile(fileName, fileExtension));
  formData.append('allowedExtensions', 'png');
  formData.append('allowedExtensions', 'jpg');
  formData.append('allowedExtensions', 'jpeg');

  await deleteTempFile(fileName, fileExtension);

  const response = await POST(
    STORAGE_BASE_URL + '/content/add-file',
    formData,
    token,
    `multipart/form-data; boundary=${formData._boundary}`
  );

  if (!response) return false;

  if (response.statusCode === 400)
    throw {
      name: 'badRequest',
      message: response.message,
    };

  if (response.statusCode === 401)
    throw {
      name: 'unauthorized',
      message: response.message,
    };

  if (response.statusCode !== 200) return false;

  return true;
};

const remove = async (imageUrl, token = null) => {
  if (!imageUrl) return false;

  const response = await DELETE(
    STORAGE_BASE_URL + '/content' + imageUrl,
    token
  );

  if (!response) return false;

  return true;
};

const getActivityOperationType = (requestMethod) => {
  switch (requestMethod) {
    case 'post':
      return 'create';
    case 'put':
      return 'update';
    case 'delete':
      return 'delete';
    default:
      requestMethod;
  }
};

const fileTypeDataKeys = [
  'banner',
  'banner2',
  'banner3',
  'image',
  'imageFull',
  'imageFlutterApp',
  'imageUrl',
  'csv',
];

module.exports = {
  getSortingOrderAsSequelize: (sortQueryValue) => {
    /*
      sortQueryValue = example_asc || example_example_asc
    */

    const sortSplitArray = _.split(_.lowerCase(sortQueryValue), ' ');

    const sortMethod = sortSplitArray.pop();

    return [[_.join(sortSplitArray, '_'), _.upperCase(sortMethod)]];
  },

  prepareUploadedFile(file) {
    const validFile = checkFileValidation(file);
    const fileName = getFileRandomName();
    const fileExtension = getFileExtension(
      validFile && validFile.hapi.filename
    );

    return {
      file: validFile,
      fileName,
      fileExtension,
    };
  },

  async uploadFile(service, file, fileName, fileExtension, token, message) {
    if (!file) {
      return true;
    }
    const success = await add(service, file, fileName, fileExtension, token);

    if (!success)
      throw {
        name: 'expectationFailed',
        message: message,
      };

    return success;
  },

  deleteFile: async (fileUrl, token) => {
    if (fileUrl) {
      const response = await remove(fileUrl, token);

      if (!response)
        throw {
          name: 'expectationFailed',
          message: 'File delete unsuccessful',
        };
    }

    return true;
  },

  getLoggingOptions: (moduleName, request, identifierName = 'id') => {
    try {
      const payload = _.omit(request.payload, fileTypeDataKeys);
      const userEmail = request.auth.credentials.email;
      const activityTime = new Date();

      return {
        moduleName,
        operationType: getActivityOperationType(request.method),
        identifier: (request.params && request.params[identifierName]) || null,
        data: payload,
        activityBy: userEmail,
        activityAt: activityTime.getTime(), // This is epoch time in millies
      };
    } catch (error) {
      logger.error('getLoggingOptions', error);

      return null;
    }
  },
};
