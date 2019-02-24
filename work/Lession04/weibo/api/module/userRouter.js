const fs = require("fs");
const url = require("url");
const help = require("./common");
const config = require("./config");
module.exports.reg=function (req,res) {
    // 用于用户注册的接口
    /*思路：
    * 1、接收参数
    * 2、判断用户名是否已存在
    *   1、存在，返回此用户名已被占用
    *   2、不存在。
    *       1、将你的数据进行更新
    *       2、将更新的后的结果进行返回*/
    var query = url.parse(req.url,true).query;
    var userName = query.userName;
    // var passWord = md5(query.passWord+"weibo@com");
    var passWord = help.getPassWord(query.passWord);
    // 判断用户名是否已存在  1、将数据拉取过来，2，根据你的用户名进行查找  findIndex
    fs.readFile(config.pubPath+"/api/data/user.json",function (err,results) {
        var userList = JSON.parse(results);// 将得到的结果转为JSON对象
        // userIndex:查找到的用户所在数组当中下标值。
        // var userIndex = userList.findIndex(function (v) {
        //     return v.userName === userName
        // })
        var userIndex = userList.findIndex(v=>v.userName === userName);
        if(userIndex > -1){
            help.send(res,-1,"用户名已存在");
            // res.end(JSON.stringify({
            //     ok:-1,
            //     msg:"用户名已存在"
            // }))
        }else{
            // 将数据进行更新
            userList.unshift({
                userId:Date.now(),
                userName,
                passWord,
                addTime:help.getNowTime()
            });
            fs.writeFile(config.pubPath+"/api/data/user.json",JSON.stringify(userList),function (err) {
                // res.end(JSON.stringify({
                //     ok:1,
                //     msg:"成功"
                // }))
                help.send(res);
            })
        }

    })
}