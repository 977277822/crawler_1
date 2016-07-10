/**
 * Created by Mr.Carry on 16/7/10.
 */
var mapToSql = require("./map_to_sql");
var mysql_connection = require("./mysql_connection");


module.exports = {
    insert: function (row) {
        console.log(JSON.stringify(row));
        var sqlObject = mapToSql.insert(row);
        mysql_connection.query(sqlObject.sql, sqlObject.params, function (data) {
        });
    }
}