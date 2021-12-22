require("./global");

const config = require("../config"),
  expressLoader = require("./express"),
  databaseLoader = require("./database"),
  eventLoader = require('./event'),
  subscriberLoader = require('./subscriber')

module.exports = async () => {
  try {
    global.config = config;

    global.events = eventLoader()

    global.database = await databaseLoader();
    console.log("Database Initialized");

    global.server = await expressLoader();
    console.log("Express Initialized");

    subscriberLoader()
  } catch (error) { log(error) }
};
