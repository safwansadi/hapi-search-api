"use strict";

const db = require("../models/");
const { Sequelize } = db;
const { Op, QueryTypes } = Sequelize;
const logger = require("../utils/logger");
const _ = require("lodash");
const BaseService = require("./base-service");
const tag = "services/product.js";

class Product extends BaseService {
  constructor() {
    super("product");
  }
  async searchProduct(queries) {
    try {
      const key = queries.key;
      const keywords = key.includes(" ") ? _.split(queries.key, " ") : [key];

      console.log("keywords", keywords);
      // const sort = queries.sort;
      // const page = parseInt(queries.page);
      // const limit = parseInt(queries.limit);
      // const offset = page * limit - limit;

      const products = await super.readByWhere(
        [
          "id",
          "slug",
          "name",
          "nameBn",
          "tags",
          "retailPrice",
          "discountPrice",
          "quantity",
        ],
        {
          [Op.or]: [
            ..._.map(keywords, (keyword) =>
              Sequelize.where(Sequelize.fn("lower", Sequelize.col("tags")), {
                [Op.substring]: keyword.toLowerCase().trim(),
              })
            ),
          ],
          status: "active",
        }
      );
      // console.log("products", products);
      return { success: true, data: products };
    } catch (error) {
      logger.error(tag + ": searchProductForCustomerV2", error);

      return { success: false, data: error };
    }
  }
}
module.exports = Product;
