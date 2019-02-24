const querystring = require("querystring");// 内置的模块
var str = "context=1&b=3";
console.log(querystring.parse(str));