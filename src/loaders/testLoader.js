require("./global");

const config = require("../config")

module.exports = async () => {
  global.config = config;
};
