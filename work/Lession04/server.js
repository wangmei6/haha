const http = require("http");
const url = require("url");
http.createServer(function (req,res) {
    console.log(req.headers.origin);
    var allowOrigin = [
        "http://localhost:63342",
        "http://127.0.0.1",
        "http://10.9.22.194"
    ]
    if(allowOrigin.includes(req.headers.origin)){
        res.writeHead(200,{
            "Access-Control-Allow-Origin":req.headers.origin// * 允许所有人访问
        })
    }

    // res.writeHead(200,{
    //     "Access-Control-Allow-Origin":"http://localhost:63342"// * 允许所有人访问
    // })
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url,true).query;
    if(pathname === "/sum"){
        res.end(JSON.stringify({
            ok:1,
            status:query.a/1+query.b/1
        }))
    }else{
        res.end("404");
    }
}).listen(80,function () {
    console.log("success");
})