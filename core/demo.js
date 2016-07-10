/**
 * Created by Mr.Carry on 16/7/10.
 */
var moment = require("moment");
var crypto = require('crypto');
var cheerio = require("cheerio");
var zlib = require('zlib');
var gunzipStream = zlib.createGunzip();
var iconv = require('iconv-lite');
var http = require('http');


function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

// 定义申请获得的appKey和appSecret
var app_key = "97558137";
var secret = "bffdc7347ac97860b08eeb9b1994ebcc";

var host = "123.56.238.200";
var port = "8123";
//待抓取对网址（不带http://前缀）
var path = "www.163.com";

var keygen = {
    "app_key" : app_key,
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



var options = {};

options.host = host;
options.port = port;
options.method = "GET";


options.path = "http://" + path;
options.headers = {
    "Proxy-Authorization": getKey(),
    "Host" : path,
};


var req = http.request(options, function (res) {
    var result = [];
    /**
     * gzip格式数据，先解压缩，再处理数据
     */
    if(res.headers['content-encoding'].indexOf('gzip') != -1) {
        res.pipe(gunzipStream).on("data",function(data){
            /**
             * 163的页面编码格式为gb2312 ，所以解压缩为GB，实际根据抓取的页面编码格式调整
             */
            result.push(iconv.decode(data, 'GBK'))
        }).on("end",function(){
            console.log(result.join(" "))
        })
    }
});

req.end();

