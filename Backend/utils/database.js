const mysql = require('mysql2')


const pool = mysql.createPool({
    database:'advance_expense_tracker',
    user:'root',
    password:"password",
    host:'localhost'
})


module.exports = pool.promise()