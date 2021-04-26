require('dotenv').config();
const { Pool, Client } = require("pg");
const connectionString = process.env.REACT_APP_DB_URL;

// SQL_ELEPHANT=
// postgres://username:password@hostname/databasename

const pool = new Pool({connectionString});

module.exports = pool;