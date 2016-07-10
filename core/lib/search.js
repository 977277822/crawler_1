/**
 * Created by Mr.Carry on 16/7/10.
 */


var fs = require("fs");

var config = fs.readFileSync("./search1.txt","utf-8");


module.exports = function(){
    return config.split("\n");
}