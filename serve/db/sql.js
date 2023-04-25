const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wzh112233',
  database: 'my_tea_db'
})
module.exports = connection