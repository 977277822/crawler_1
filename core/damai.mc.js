var proxy_request = require("./lib/poxy_request");
var get_image = require("./lib/get_image");

var util = require("./lib/util");

var cheerio = require("cheerio");


var send = function () {
    for (var i = 1; i <= 3; i++) {
        path = "http://s.damai.cn/v2_0/projectList.aspx?keyword=&categoryId=22&categoryName=musical&cityId=&date=&showmode=list&sortid=0&pageindex="+i+"&artistId=&reverse=0";
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
    $("#pageplist > li").each(function(){
        var that = $(this);
        var mc_name = that.find(".f14 > a").text();
        var mc_detail = that.find(".new-list-info > p").first().text();
        var mc_image = that.find(".new-list-img > img").attr("src");
        var row = {
            "mc_name" : mc_name,
            "mc_detail" : mc_detail,
            "mc_image" : mc_image,
            "table_name" : "damai_mc"
        };
        get_image({
            path: mc_image,
            charset: "utf-8"
        }, function (data) {
            row.mc_image = data;
        });
        util.insert(row);
    })

}


send();

