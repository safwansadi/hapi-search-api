"use strict";

const db = require("../models/index");

class BaseService {
  constructor(model) {
    this.model = model;
  }
  async readByWhere(attributes, where, include, order, offset, limit) {
    let query = {};

    query["attributes"] = attributes && attributes;
    query["include"] = include && include;
    query["where"] = where;
    query["order"] = order && order;
    query["offset"] = offset && offset;
    query["limit"] = limit && limit;

    return await db[this.model].findAll(query);
  }
}

module.exports = BaseService;
