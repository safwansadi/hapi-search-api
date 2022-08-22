"use strict";

const Boom = require("@hapi/boom");
const { captureActivities } = require("../lib/event-storage");

const errorMapper = (object) => {
  // console.error(object);

  let message = "";
  const { name } = object;

  if (object && object.errors && object.errors[0] && object.errors[0].message) {
    const { message: errorMessage } = object.errors[0];
    message = errorMessage;
  } else if (object && object.parent && object.parent.sqlMessage) {
    const { sqlMessage: errorMessage } = object.parent;
    message = errorMessage;
  } else if (object && object.message) {
    const { message: errorMessage } = object;
    message = errorMessage;
  }

  // error mapper for sequelize
  if (name === "SequelizeDatabaseError") {
    return Boom.internal(message);
  }

  if (name === "SequelizeValidationError") {
    return Boom.badRequest(message);
  }

  if (name === "SequelizeUniqueConstraintError") {
    // const { value, path } =
    //   (object && object.errors && object.errors[0]) || null;
    // message = !value || !path ? message : `${value} ${path} already in use.`;
    return Boom.badRequest(message);
  }

  if (name === "SequelizeForeignKeyConstraintError") {
    return Boom.locked(
      "Cannot delete or update a parent row, due to there is child data depends on it."
    );
  }

  // error mapper for other purpose
  if (name === "badRequest") {
    // 400
    return Boom.badRequest(message);
  }

  if (name === "unauthorized") {
    // 401
    return Boom.unauthorized(message || "You are not authorized");
  }

  if (name === "paymentRequired") {
    // 402
    return Boom.unauthorized(message);
  }

  if (name === "forbidden") {
    // 403
    return Boom.forbidden(message);
  }

  if (name === "notFound") {
    // 404
    return Boom.notFound(message);
  }

  if (name === "badData") {
    // 422
    return Boom.badData(message);
  }

  if (name === "badImplementation") {
    return Boom.badImplementation(message);
  }

  let error;
  // if all others fails
  if (!message) {
    error = Boom.badRequest(
      "Something went wrong, please have patient and try again"
    );
    error.output.payload.messageBn =
      "কিছু ভুল হয়েছে, অনুগ্রহ করে ধৈর্য ধরুন এবং আবার চেষ্টা করুন";
    error.reformat();
  }
  return error;
};

module.exports = {
  error: (object, loggingOptions, authToken) => {
    if (loggingOptions) {
      captureActivities(
        {
          ...loggingOptions,
          success: false,
        },
        authToken
      );
    }

    const error = errorMapper(object);

    if (object.messageBn) {
      error.output.payload.messageBn = object.messageBn;
      error.reformat();
    }

    return error;
  },

  success: (data, message, loggingOptions, authToken) => {
    if (loggingOptions) {
      captureActivities(
        {
          ...loggingOptions,
          success: true,
        },
        authToken
      );
    }

    return {
      statusCode: 200,
      data,
      message,
    };
  },
};
