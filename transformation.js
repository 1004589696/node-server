/**
 * Created by Administrator on 2017/7/31.
 */

var xlsx = require("node-xlsx");
var fs = require('fs');
var path = require('path');

var list = xlsx.parse(process.cwd() + '/data/couponInsert.xlsx');

writeFile(path.join(process.cwd()+'/data',"couponInsert.json"),JSON.stringify(list));
function writeFile(fileName,data) {
    fs.writeFile(fileName,data,'utf-8',complete);
    function complete(err){
        if(!err){
            console.log("文件生成成功");
        }
    }
}