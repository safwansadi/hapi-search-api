"use strict";

const db = require("../models/");
const { Sequelize } = db;
const { Op } = Sequelize;
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
      const keywords = _.split(queries.key, " ");

      // const sort = [
      //   [
      //     Sequelize.literal(
      //       `CASE WHEN tags like ' %${key}%' THEN 1 ELSE 2 END`
      //     ),
      //     "desc",
      //   ],
      // ];

      let page = queries.page && parseInt(queries.page);
      let limit = queries.page && queries.limit && parseInt(queries.limit);
      let offset = queries.page && queries.limit && page * limit - limit;

      const productsExactMatch = await super.readByWhere(
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
            Sequelize.where(Sequelize.fn("lower", Sequelize.col("tags")), {
              [Op.substring]: key.toLowerCase().trim(),
            }),
          ],
          status: "active",
        },
        null,
        null,
        offset,
        limit
      );

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
            Sequelize.where(Sequelize.fn("lower", Sequelize.col("tags")), {
              [Op.substring]: key.toLowerCase().trim(),
            }),
            ..._.map(keywords, (keyword) =>
              Sequelize.where(Sequelize.fn("lower", Sequelize.col("tags")), {
                [Op.substring]: keyword.toLowerCase().trim(),
              })
            ),
          ],
          status: "active",
        },
        null,
        null,
        offset,
        limit
      );

      let result = {
        productsExactMatch,
        products,
      };

      console.log("product", products);

      return { success: true, data: result };
    } catch (error) {
      logger.error(tag + ": searchProductForCustomerV2", error);

      return { success: false, data: error };
    }
  }
}
module.exports = Product;
