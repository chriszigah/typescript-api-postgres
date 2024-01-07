var knex = require("knex");

const config = require("../knexfile");

//var env = process.env.NODE_ENV || "development";

var env = "development";

const configOptions = config[env];

const db = knex(configOptions);

module.exports = db;
