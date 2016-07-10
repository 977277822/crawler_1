/**
 * Created by Mr.Carry on 16/7/10.
 */


var fs = require("fs");

var config = fs.readFileSync("./search.txt","utf-8");

console.log(config.split("\n"))
