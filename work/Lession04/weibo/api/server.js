const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");
const router = require("./module/router");
const userRouter = require("./module/userRouter");
// const md5 = require("md5");
const help = require(__dirname+"/module/common");
const server = http.createServer((req,res)=>{
    // console.log(req.method);//方式。post
    const method = req.method.toLowerCase();
    var pathname = url.parse(req.url).pathname;
    if(method === "get"){
        var query = url.parse(req.url,true).query;
        if(pathname === "/"){
            router.home(res);
        }
        else if(pathname === "/style/weibo.css" || pathname === "/img/icons.png" || pathname ==="/img/takeSbmComment.png"){
            fs.readFile(path.resolve(__dirname,"../"+pathname),function (err,results) {
                res.end(results);
            })
        }
        else if(pathname === "/b"){
            fs.readFile(path.resolve(__dirname,"../js/baiduTemplate.js"),function (err,results) {
                res.end(results);
            })
        }
        else if(pathname === "/reg"){
            userRouter.reg(req,res);

        }
        else if(pathname === "/login"){
            /*思路：
            * 1、先接收参数
            * 2、应该先将user.json读取出来，然后验证你的用户名密码是否正确
            *   1、失败，返回错误信息
            *   2、成功，返回用户信息   userId,userName*/
            var userName = query.userName;
            // var passWord = md5(query.passWord+"weibo@com");
            var passWord = help.getPassWord(query.passWord);
            fs.readFile(__dirname+"/data/user.json",function (err,results) {
                var userList = JSON.parse(results);
                var user = userList.find(v=>v.userName === userName && v.passWord === passWord);
                if(user){
                    res.end(JSON.stringify({
                        ok:1,
                        userId:user.userId,
                        userName:user.userName
                    }))
                }else{
                    help.send(res,-1,"账号密码错误")
                }
            })

        }
        else if(pathname === "/getweibo"){
            fs.readFile(__dirname+"/data/data.json",function (err,results) {
                res.end(JSON.stringify({
                    ok:1,
                    contextList:JSON.parse(results)
                }))
            })
        }
        else if(pathname === "/deleteweibo"){
            var id = query.id/1;//  微博的唯一标识
            var userId = query.userId/1; // 用户的唯一标识
            fs.readFile(__dirname+"/data/data.json",function (err,results) {
                var contextList = JSON.parse(results);
                var index = contextList.findIndex(v=>v.id === id && v.userId === userId);
                if(index>-1){// 符合条件
                    contextList.splice(index,1);
                    fs.writeFile(__dirname+"/data/data.json",JSON.stringify(contextList),function () {
                        help.send(res);
                    })
                }else{
                    help.send(res,-1,"自己只能删除自己的！")
                }
            })
        }
        else{
            res.end("404");
        }
    }
    else if(method === "post"){
        /*思路：
        * 1、接收数据 POST
        * 2、验证信息是否重复
        *    1、是  返回错误信息
        *    2、无  得到的信息添加到你的data.json当中
        *              1、通过userID,得到你的userName*/
        if(pathname === "/addweibo"){
            var str ="";
            // 接收数据
            req.on("data",function (chunk) {
                // console.log(111111111111);
                str+=chunk;
            })
            // 数据接收完毕
            req.on("end",function () {
                var query = querystring.parse(str);
                fs.readFile(__dirname+"/data/data.json",function (err,results) {
                    var contextList = JSON.parse(results);
                    // 验证用户与信息是否有一样的。
                    var index = contextList.findIndex(v=>v.context === query.context && v.userId === query.userId/1);
                    if(index > -1){
                        help.send(res,-1,"请不要重复提交！")
                    }else{
                        fs.readFile(__dirname+"/data/user.json",function (err,results) {
                            var userInfo = JSON.parse(results).find(v=>v.userId === query.userId/1);
                            if(userInfo){
                                contextList.unshift({
                                    id:Date.now(),
                                    context:query.context,
                                    topNum:0,
                                    downNum:0,
                                    addTime:help.getNowTime(),
                                    userId:query.userId/1,
                                    userName:userInfo.userName
                                });
                                fs.writeFile(__dirname+"/data/data.json",JSON.stringify(contextList),function () {
                                    help.send(res);
                                })
                            }else{
                                help.send(res,-1,"您的用户不在");
                            }
                        })
                    }
                })
            })
        }
    }

})
server.listen(80,function () {
    console.log("success");
})