/**
 * Created by Mr.Carry on 16/7/10.
 */
var key = require("./key");
var zlib = require('zlib');
var url = require("url");
var iconv = require('iconv-lite');
var http = require('http');
var deasync = require('deasync');



var options = {};

//这里代理到fiddler
options.host = key.host;

options.port = key.port;

/**
 * @param params {path , method , charset }
 * @param callback 请求完成后回调函数 参数为页面内容字符串
 */
module.exports = function (params, callback) {
    var isReturn = false;
    var urlObj = url.parse(params.path);
    options.method = params.method || "GET";
    options.path = urlObj.href;
    options.headers = {
        "Connection" : "keep-alive",
        "Proxy-Authorization": key.getKey(),
        "Host": urlObj.host
    };

    var req = http.request(options, function (res) {
        var result = [];
        var response;
        var resContentEncoding = res.headers['content-encoding'];
        if (resContentEncoding && resContentEncoding.indexOf('gzip') != -1) {
            var gunzipStream = zlib.createGunzip();
            response = res.pipe(gunzipStream);
        }else{
            response = res;
        }
        response.on("data", function (data) {
            result.push(iconv.decode(data, params.charset || "UTF-8"))
        }).on("end", function () {
            isReturn = true;
            if(callback){
                callback(result.join(" "));
            }
        })
    });
    req.end();
    while(!isReturn){
        deasync.runLoopOnce();
    }
}
