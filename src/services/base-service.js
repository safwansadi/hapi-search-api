"use strict";

const db = require("../models/index");
const { getInvalidFileTypeMessage } = require("../utils/validation");
const _ = require("lodash");

class BaseService {
  constructor(model) {
    this.model = model;
  }
  async readByWhere(attributes, where, include, order, offset, limit) {
    return await db[this.model].findAll({
      attributes: !attributes ? undefined : attributes,
      include: !include ? undefined : include,
      where,
      order: !order ? undefined : order,
      offset: !offset ? undefined : offset,
      limit: !limit ? undefined : limit,
    });
  }
}

module.exports = BaseService;
