var mysql = require('mysql');

var connectionToMySql = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"node_js_sample_db",
  password: ""
});

connectionToMySql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports=connectionToMySql;
