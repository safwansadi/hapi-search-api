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

  getProductsForSearchV2(keywords, result) {
    return new Promise((resolve) => {
      const tempData = [];
      for (let i = 0; i < _.size(result); i++) {
        const resultTags = _.split(result[i].name, " ");
        // console.log('result name', resultTags);
        for (let j = 0; j < _.size(resultTags); j++) {
          // console.log('trimmed', resultTags[j]);
          const words = _.split(resultTags[j].toLowerCase(), " ");

          // console.log('words', words);

          const keywordsMatchCount = _.reduce(
            keywords,
            (result, value) => {
              if (_.find(words, (word) => word.startsWith(value.toLowerCase())))
                return result + 1;

              return result;
            },
            0
          );

          console.log("keywordsMatchCount", keywordsMatchCount);

          // if (_.isEqual(keywordsMatchCount, 0)) continue;

          tempData.push({
            product: result[i],
            // sentence: trimmedResultTag,
            wordsCount: _.size(words),
            keywordsMatchCount,
          });

          // console.log(tempData['keywordsMatchCount']);
        }
      }

      resolve(
        _.uniqBy(
          _.map(
            _.reverse(_.sortBy(tempData, ["keywordsMatchCount"])),
            (datum) => this.setProductData(datum.product.toJSON())
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

      const formattedProducts = await this.getProductsForSearchV2(
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
