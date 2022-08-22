"use strict";

const Service = require("../../services/product");
const { success, error } = require("../../utils/response");
const { getLoggingOptions } = require("../../utils");

const service = new Service();

module.exports = {
  searchProductByStoreSlugForCustomerV2: async (request, h) => {
    const { params, query } = request;

    const result = await service.searchProductByStoreSlugForCustomerV2(
      params.slug,
      query
    );

    if (!result.success) return error(result.data);

    return success(result.data, "Success");
  },
};
