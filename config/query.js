const mysql = require("mysql2");
require("dotenv").config();

// create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "",
});

module.exports = pool;
