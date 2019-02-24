const express = require("express");
const app = express();
// 可以设置自己的静态资源。
app.use(express.static("./weibo"));// 文件夹
app.post("/",function (req,res) {
    res.json({
        ok:1,
        msg:"xixi"
    })
})
app.listen(80,function () {
    console.log("success");
})