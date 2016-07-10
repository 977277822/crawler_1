/**
 * Created by Mr.Carry on 16/7/10.
 */


var sqlDataFunc = function (obj) {
    var column = [];
    var values = [];
    var params = [];
    var table_name = obj.table_name;
    delete  obj.table_name;

    for (var p in obj) {
        column.push("`" + p + "`");
        values.push("?");
        params.push(obj[p]);
    }

    return {
        tableName: table_name,
        column: column,
        values: values,
        params: params
    }
}

module.exports = {
    insert: function (obj) {
        var sql = "INSERT INTO `__table_name` (__columns) VALUES (__values);";
        var sqlData = sqlDataFunc(obj);
        sql = sql.replace(/__table_name/, sqlData.tableName).replace(/__columns/, sqlData.column.join(",")).replace(/__values/, sqlData.values.join(","));
        return {
            sql: sql,
            params: sqlData.params
        };
    }
};
