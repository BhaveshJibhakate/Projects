// const mysql=require("mysql2")  // imported mysql2 driver for db connection
// // we are doing callback here not promise based
// //else we would have done const mysql=require("mysql2/promise")
// // then before each method need to write await keyword
// const connection=mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"root123",
//     database:"food_app",
// })

// module.exports=connection

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "food_app",
  waitForConnections: true,
  connectionLimit: 10,   // number of connections in pool
  queueLimit: 0
});

module.exports = pool;
