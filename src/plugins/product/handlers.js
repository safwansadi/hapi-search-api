"use strict";

const Service = require("../../services/product");
const { success, error } = require("../../utils/response");
const { getLoggingOptions } = require("../../utils");

const service = new Service();

module.exports = {
  searchProduct: async (request, h) => {
    const { query } = request;

    const result = await service.searchProduct(query);

    if (!result.success) return error(result.data);

    return success(result.data, "Success");
  },
};
