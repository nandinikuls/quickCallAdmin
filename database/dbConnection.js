const sql = require("mssql");
const config = require("../config/config.js");
const logger = require("../src/logger.js");

const poolPromise = new sql.ConnectionPool(config.sql)
  .connect()
  .then((pool) => {
    logger.info("Database connected successfully");
    console.log("Connected to the database!");
    return pool;
  })
  .catch((err) => {
    logger.error(err.message);
    console.log("Connection failed!", err);
  });

module.exports = { sql, poolPromise };
