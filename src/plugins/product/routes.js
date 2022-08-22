"use strict";

const product = require("./handlers");
const validators = require("./validators");

module.exports = [
  {
    method: "GET",
    path: "/api/v2/customer/product-search",
    handler: product.searchProduct,
    options: {
      auth: false,
    },
  },
];
