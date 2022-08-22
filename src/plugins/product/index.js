"use strict";

exports.plugin = {
  name: "product",
  version: "1.0.0",
  register: (server) => {
    server.route(require("./routes"));
  },
};
