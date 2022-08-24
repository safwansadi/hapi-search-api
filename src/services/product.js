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

  getProductsForSearch(keywords, result) {
    return new Promise((resolve) => {
      const tempData = [];
      for (let i = 0; i < _.size(result); i++) {
        const resultNames = _.split(result[i].name, " ");
        for (let j = 0; j < _.size(resultNames); j++) {
          let compare = (a1, a2) => {
            return resultNames.reduce((a, c) => a + keywords.includes(c), 0);
          };

          const keywordsMatchCount = compare(resultNames, keywords);

          console.log("keywordsMatchCount", keywordsMatchCount);

          tempData.push({
            product: result[i],
            keywordsMatchCount,
          });
        }
      }

      resolve(
        _.uniqBy(
          _.map(
            _.reverse(_.sortBy(tempData, ["keywordsMatchCount"])),
            (datum) => datum.product.toJSON()
          ),
          "id"
        )
      );
    });
  }

  async searchProduct(queries) {
    try {
      const key = queries.key;
      const keywords = _.split(queries.key, " ");

      let page = queries.page && parseInt(queries.page);
      let limit = queries.page && queries.limit && parseInt(queries.limit);
      let offset = queries.page && queries.limit && page * limit - limit;

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
            Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
              [Op.substring]: key.toLowerCase().trim(),
            }),
            ..._.map(keywords, (keyword) =>
              Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
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

      const formattedProducts = await this.getProductsForSearch(
        keywords,
        products,
        !queries.price ? null : _.split(queries.price, "-"),
        !queries.brand ? null : _.split(queries.brand, ",")
      );

      return { success: true, data: formattedProducts };
    } catch (error) {
      logger.error(tag + ": searchProductForCustomer", error);

      return { success: false, data: error };
    }
  }
}
module.exports = Product;
