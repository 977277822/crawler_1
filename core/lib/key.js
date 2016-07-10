var moment = require("moment");

var crypto = require('crypto');

var fs = require("fs");

var config = JSON.parse(fs.readFileSync("./lib/config.json","utf-8"));

function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

var host = config["poxy-host"];

var port = config["poxy-port"];

var secret = config["poxy-secret"];

var keygen = {
    "app_key" : config["poxy-appkey"],
    "timestamp" : moment().format('YYYY-MM-DD HH:mm:ss')
}


var getKey = function(){
    var list = [secret];
    var param = [];
    for(var p in keygen){
        str = p + "" + keygen[p];
        list.push(str);
    }
    for(var p in keygen){
        str = p + "=" + keygen[p];
        param.push(str);
    }
    list.push(secret);
    var m5 = "MYH-AUTH-MD5 sign=" + md5(list.join("")).toUpperCase() + "&" + param.join("&");
    return m5;
}

module.exports = {
    host : host,
    port : port,
    getKey : function(){
        return getKey();
    }
};


