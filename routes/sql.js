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
    if(airedFrom===null||airedFrom===undefined||airedFrom===""||airedFrom==="undefined"||airedTo===null||airedTo===undefined||airedTo===""||airedTo==="undefined"){
        where_aired="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_name,ani_episode,GROUP_CONCAT(gen_name SEPARATOR ',') gen_name,ani_aired,typ_name,ani_score,ani_num \n" +
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
router.get('/episode',function(req,res,next){
    var episodeFrom=req.query.episode_from;
    var episodeTo=req.query.episode_to;
    var order=req.query.order;
    console.log(episodeFrom);
    console.log(episodeTo);
    console.log(order);
    var where_episode="WHERE a.ani_episode >= "+episodeFrom+" and a.ani_episode <= "+episodeTo+" ";
    var where_order="order by a."+order+" desc";
    if(episodeFrom===null||episodeFrom===undefined||episodeFrom===""||episodeFrom==="undefined"||episodeTo===null||episodeTo===undefined||episodeTo===""||episodeTo==="undefined"){
        where_episode="";
    }
    if(order===null||order===undefined||order===""||order==="undefined"){
        where_order="";
    }
    var sql="SELECT * FROM\n" +
        "(select distinct ani_id,ani_name,ani_episode,GROUP_CONCAT(gen_name SEPARATOR ',') gen_name,ani_aired,typ_name,ani_score,ani_num \n" +
        "from anime \n" +
        "NATURAL INNER JOIN ani_gen NATURAL INNER JOIN genres \n" +
        "NATURAL INNER JOIN ani_typ NATURAL INNER JOIN type \n" +
        "NATURAL INNER JOIN ani_score_num GROUP BY ani_aired) a\n"+where_episode+where_order+";";
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
router.get('/user/bd/sc',function(req,res,next){
    var sql="select user_id,user_name,count(ani_id) user_listnum from user NATURAL INNER JOIN watching \n" +
        "group by user_id order by user_listnum desc;";
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
router.get('/user/bd/gk',function(req,res,next){
    var look=req.query.look;
    console.log(look);
    var where_look="WHERE sta_id = "+look+" ";
    if(look===null||look===undefined||look===""||look==="undefined"){
        where_look="";
    }
    var sql="select user_id,user_name,count(ani_id) user_finishnum from user NATURAL INNER JOIN \n" +
        "watching "+where_look+"GROUP BY user_id order by user_finishnum desc;";
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

router.get('/user/dx',function(req,res,next){
    var name=req.query.name;
    console.log(name);
    var where_name="WHERE user_name LIKE '%"+name+"%' ";
    if(name===null||name===undefined||name===""||name==="undefined"){
        where_name="";
    }
    var sql="select user_id,user_name from user "+where_name+";";
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
router.get('/user',function(req,res,next){
    var id=req.query.id;
    console.log(id);
    var where_id="WHERE user_id = "+id+" ";
    if(id===null||id===undefined||id===""||id==="undefined"){
        where_id="";
    }
    var sql="select user_id,ani_id,ani_name,sta_name,wat_rating,ani_episode from user NATURAL INNER \n" +
        "JOIN watching NATURAL INNER JOIN anime NATURAL INNER JOIN status "+where_id+"\n" +
        "order by wat_rating desc,sta_id;";
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