var express=require('express');
var mysql=require('mysql');
var router = express.Router();

var db=mysql.createConnection({host: "test-database.mysql.polardb.rds.aliyuncs.com",
    port: "3306",
    user: "cloud",
    password: "Qwertyuiop1!",
    database: "hxy"});

router.get('/',function(req,res,next){
    db.query("SELECT * FROM student",function(err,data){
        if(err){
            console.log("数据库访问出错",err);
        }else{
            console.log(data);
        }
        res.end(JSON.stringify(data));
    });
});

module.exports = router;