var express=require('express');
var mysql=require('mysql');
var router = express.Router();

var db=mysql.createConnection({host: "test-database.mysql.polardb.rds.aliyuncs.com",
    port: "3306",
    user: "cloud",
    password: "Qwertyuiop1!",
    database: "myanime"});

router.get('/genres',function(req,res,next){
    var genres=req.query.genres;
    var order=req.query.order;
    console.log(genres);
    console.log(order);
    var where_genres="WHERE a.gen_name LIKE '%"+genres+"%' ";
    var where_order="order by a."+order+" desc";
    if(genres===null||genres===undefined||genres===""||genres==="undefined"){
        where_genres="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_name,ani_episode,GROUP_CONCAT(gen_name SEPARATOR ',') gen_name,ani_aired,typ_name,ani_score,ani_num \n" +
        "from anime \n" +
        "NATURAL INNER JOIN ani_gen NATURAL INNER JOIN genres \n" +
        "NATURAL INNER JOIN ani_typ NATURAL INNER JOIN type \n" +
        "NATURAL INNER JOIN ani_score_num GROUP BY ani_name) a\n"+where_genres+where_order+";";
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
router.get('/type',function(req,res,next){
    var type=req.query.type;
    var order=req.query.order;
    console.log(type);
    console.log(order);
    var where_type="WHERE a.typ_name = '"+type+"' ";
    var where_order="order by a."+order+" desc";
    if(type===null||type===undefined||type===""||type==="undefined"){
        where_type="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_name,ani_episode,GROUP_CONCAT(gen_name SEPARATOR ',') gen_name,ani_aired,typ_name,ani_score,ani_num \n" +
        "from anime \n" +
        "NATURAL INNER JOIN ani_gen NATURAL INNER JOIN genres \n" +
        "NATURAL INNER JOIN ani_typ NATURAL INNER JOIN type \n" +
        "NATURAL INNER JOIN ani_score_num GROUP BY ani_name) a\n"+where_type+where_order+";";
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

router.get('/name',function(req,res,next){
    var name=req.query.name;
    var order=req.query.order;
    console.log(name);
    console.log(order);
    var where_name="WHERE a.ani_name LIKE '%"+name+"%' ";
    var where_order="order by a."+order+" desc";
    if(name===null||name===undefined||name===""||name==="undefined"){
        where_name="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_name,ani_episode,GROUP_CONCAT(gen_name SEPARATOR ',') gen_name,ani_aired,typ_name,ani_score,ani_num \n" +
        "from anime \n" +
        "NATURAL INNER JOIN ani_gen NATURAL INNER JOIN genres \n" +
        "NATURAL INNER JOIN ani_typ NATURAL INNER JOIN type \n" +
        "NATURAL INNER JOIN ani_score_num GROUP BY ani_name) a\n"+where_name+where_order+";";
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

router.get('/aired',function(req,res,next){
    var airedFrom=req.query.aired_from;
    var airedTo=req.query.aired_to;
    var order=req.query.order;
    console.log(airedFrom);
    console.log(airedTo);
    console.log(order);
    var where_aired="WHERE a.ani_aired BETWEEN '"+airedFrom+"' AND '"+airedTo+"'";
    var where_order="order by a."+order+" desc";
    if(aired===null||aired===undefined||aired===""||aired==="undefined"){
        where_aired="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_aired,ani_episode,GROUP_CONCAT(gen_aired SEPARATOR ',') gen_aired,ani_aired,typ_aired,ani_score,ani_num \n" +
        "from anime \n" +
        "NATURAL INNER JOIN ani_gen NATURAL INNER JOIN genres \n" +
        "NATURAL INNER JOIN ani_typ NATURAL INNER JOIN type \n" +
        "NATURAL INNER JOIN ani_score_num GROUP BY ani_aired) a\n"+where_aired+where_order+";";
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