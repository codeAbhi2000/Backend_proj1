const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    database:process.env.DB_NAME,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    timezone:'Z'
})


module.exports = pool.promise()