const fs = require("fs");
const path = require("path");
const PUBPATH = path.resolve(__dirname,"../../");
module.exports.home = function (res) {
    fs.readFile(PUBPATH+"/weibo.html",function (err,results) {
        res.end(results);
    })
}