var express=require('express');
var mysql=require('mysql');
var router = express.Router();

var db=mysql.createConnection({host: "test-database.mysql.polardb.rds.aliyuncs.com",
    port: "3306",
    user: "cloud",
    password: "Qwertyuiop1!",
    database: "annimate"});

router.get('/action',function(req,res,next){
    var genres=req.query.genres;
    var name=req.query.name;
    var order=req.query.order;
    console.log(genres);
    console.log(name);
    console.log(order);
    var where_name="name like '%"+name+"%' and ";
    var where_genres="genders like '%"+genres+"%' and ";
    var where_order="order by "+order+" desc";
    if(name===null||name===undefined||name===""||name==="undefined"){
        where_name="";
    }
    if(genres===null||genres===undefined||genres===""||genres==="undefined"){
        where_genres="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="select * from anime\n" +
        "where "+where_genres+where_name+"score REGEXP '[[:digit:]]'\n" +
        where_order;
    console.log(sql);
    db.query(sql,function(err,data){
        if(err){
            console.log("数据库访问出错",err);
        }else{
            console.log("OK");
        }
        var str="{\"code\":0,\"msg\":\"\",\"count\":"+data.length+",\"data\":"+JSON.stringify(data)+"}";
        res.end(str);
    });
});

module.exports = router;