var proxy_request = require("./lib/poxy_request");
var util = require("./lib/util");
var search = require("./lib/search");

var cheerio = require("cheerio");


var send = function (item) {
    query = encodeURIComponent(item);
    for (var i = 1; i <= 10; i++) {
        path = "http://weixin.sogou.com/weixin?type=1&query=" + query + "&ie=utf8&_sug_=y&page=" + i;
        proxy_request({
            path: path,
            charset: "utf-8"
        }, function (data) {
            toClass(data)
        });
    }
}


var toClass = function (html) {
    var $ = cheerio.load(html);
    if ($(".txt-box").length == 0) {
        return;
    };

    $(".txt-box").each(function (item) {
        var t = $(this);
        var weixin_name = t.find("h3").text();
        var weixin_id = t.find("h4 > span > label").text();
        var s = t.find(".s-p3 > .sp-txt ");
        var weixin_detail = $(s[0]).text();
        var corporate = "";
        if (s.length > 2) {
            corporate = $(s[1]).text();
        }
        var row = {
            "weixin_name": weixin_name,
            "weixin_id": weixin_id,
            "corporate": corporate,
            "weixin_detail": weixin_detail,
            "table_name": "sogo_weixin"
        }
        util.insert(row);
    })

}

var items = search();

items.forEach(function (item) {
    send(item);
});

