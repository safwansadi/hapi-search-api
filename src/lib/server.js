"use strict";

const { ENV, HOST, PORT } = require("../utils/env");
const { DEV } = require("../utils/constants");
const logger = require("../utils/logger");

const config = async () => {
  const server = require("@hapi/hapi").server({
    host: HOST || "localhost",
    port: PORT || 7000,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Content-type", "Authorization", "platform"],
      },
    },
    debug: false, // disable Hapi debug console logging
  });

  await server.register([
    {
      plugin: require("hapi-pino"),
      options: {
        logPayload: false,
        logRouteTags: true,
        logRequestStart: true,
        logRequestComplete: true,
        prettyPrint: true,
        logEvents: ENV === DEV && [
          "onPostStart",
          "onPostStop",
          "onRequest",
          "response",
          "request",
          "request-error",
          "log",
        ],

        // Redact Authorization headers, see https://getpino.io/#/docs/redaction
        redact: ["req.headers.authorization"],
      },
    },
    require("inert"),
    require("hapi-auth-jwt2"),
    require("../plugins/product"),
  ]);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
    options: {
      auth: false, // Remove this line if 'jwt' authentication required
      validate: {},
    },
  });

  return server;
};

exports.init = async () => {
  const server = await config();

  try {
    await server.initialize();
    return server;
  } catch (error) {
    console.error(error);
    logger.error("server.js", error);
  }

  return null;
};

exports.start = async () => {
  const server = await config();

  try {
    await server.start();
  } catch (error) {
    console.error(error);
    logger.error("server.js", error);
  }
};

process.on("unhandledRejection", (error) => {
  console.error(error);
  logger.error("server.js", error);
});
