"use strict";

require("dotenv").config();

module.exports = {
  ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  // JWT secret key
  SECRET_KEY: process.env.SECRET_KEY,
  // DB
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  // Email (Nodemailer)
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  // Links
  CUSTOMER_URL: process.env.CUSTOMER_URL,
  VENDOR_URL: process.env.VENDOR_URL,
  ADMIN_URL: process.env.ADMIN_URL,
  // Base Urls
  API_BASE_URL: process.env.API_BASE_URL,
  STORAGE_BASE_URL: process.env.STORAGE_BASE_URL,
  // Endpoints
  CORE_ENDPOINT: process.env.CORE_ENDPOINT,
  CUSTOMER_HOME_ENDPOINT: process.env.CUSTOMER_HOME_ENDPOINT,
  EVENT_STORAGE_ENDPOINT: process.env.EVENT_STORAGE_ENDPOINT,
  // SSL Commerz
  STORE_ID: process.env.STORE_ID,
  STORE_PASS: process.env.STORE_PASS,
  // SMS CLIENT (MUTHOFUN)
  MUTHOFUN_SMS_CLIENT_URL: process.env.MUTHOFUN_SMS_CLIENT_URL,
  MUTHOFUN_SMS_CLIENT_ID: process.env.MUTHOFUN_SMS_CLIENT_ID,
  MUTHOFUN_SMS_CLIENT_SECRET: process.env.MUTHOFUN_SMS_CLIENT_SECRET,
  // SMS CLIENT (ADN)
  ADN_SMS_CLIENT_URL: process.env.ADN_SMS_CLIENT_URL,
  ADN_SMS_CLIENT_ID: process.env.ADN_SMS_CLIENT_ID,
  ADN_SMS_CLIENT_SECRET: process.env.ADN_SMS_CLIENT_SECRET,
  // GOOGLE OAUTH CLIENT
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_ID_ANDROID: process.env.GOOGLE_CLIENT_ID_ANDROID,
  GOOGLE_CLIENT_ID_IOS: process.env.GOOGLE_CLIENT_ID_IOS,
  // FACEBOOK OAUTH CLIENT
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CLIENT_GRANT_TYPE: process.env.FACEBOOK_CLIENT_GRANT_TYPE,
  // NAGAD MERCHANT PGW
  NAGAD_BASE_URL: process.env.NAGAD_BASE_URL,
  NAGAD_MERCHANT_ACCOUNT: process.env.NAGAD_MERCHANT_ACCOUNT,
  NAGAD_MERCHANT_ID: process.env.NAGAD_MERCHANT_ID,
  NAGAD_MERCHANT_PRIVATE_KEY_FORMAT:
    process.env.NAGAD_MERCHANT_PRIVATE_KEY_FORMAT,
  NAGAD_MERCHANT_PRIVATE_KEY: process.env.NAGAD_MERCHANT_PRIVATE_KEY,
  NAGAD_PG_PUBLIC_KEY: process.env.NAGAD_PG_PUBLIC_KEY,
  // BKASH MERCHANT PGW
  BKASH_BASE_URL: process.env.BKASH_BASE_URL,
  BKASH_APP_KEY: process.env.BKASH_APP_KEY,
  BKASH_APP_SECRET: process.env.BKASH_APP_SECRET,
  BKASH_CLIENT_USERNAME: process.env.BKASH_CLIENT_USERNAME,
  BKASH_CLIENT_PASSWORD: process.env.BKASH_CLIENT_PASSWORD,
  // LOG ROOT DIR NAME
  LOG_ROOT_DIR_NAME: process.env.LOG_ROOT_DIR_NAME,
  // PURCHASE ORDER EMAIL
  PURCHASE_ORDER_EMAIL: process.env.PURCHASE_ORDER_EMAIL,
  // MAX_REFUND_DAYS_LIMIT
  MAX_REFUND_DAYS_LIMIT: process.env.MAX_REFUND_DAYS_LIMIT,
  // REPORT EMAIL
  REPORT_EMAIL: process.env.REPORT_EMAIL,
};
