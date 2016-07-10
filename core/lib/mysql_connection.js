var mysql = require('mysql');

var fs = require("fs");

var config = JSON.parse(fs.readFileSync("./lib/config.json","utf-8"));

var mysql_config = {

	host: config["mysql-host"],

	user: config["mysql-user"],

	password: config["mysql-pwd"],

	port: config["mysql-port"],

	database: config["mysql-database"]
}
var pool = mysql.createPool(mysql_config);

module.exports = {
	query: function(sql, params, callback) {
		pool.getConnection(function(err, connection) {
			// Use the connection
			connection.query(sql, params, function(err, result) {
				if (err) {
					console.log('[ERROR] - ', err.message);
					return;
				}
				if(callback){
					callback(result);
				}
				connection.release();
			});
		});
	}
};

//connection.end();