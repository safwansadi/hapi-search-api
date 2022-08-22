"use strict";

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = require("../utils/env");
const logger = require("../utils/logger");

const config = {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: `${DB_USERNAME}`,
  password: `${DB_PASSWORD}`,
  database: `${DB_NAME}`,
  pool: {
    max: 10,
  },
  logging: (msg) => logger.debug("db.js", msg),
};

module.exports = {
  ...config,
};
