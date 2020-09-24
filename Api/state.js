// const https = require("https");
const  admin  = require("../lib/user.js").admin;
const organiza = require("../lib/user.js").organiza;

function state(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  const obj = {
    userid:a.userid,
  };
  organiza.find(obj,(err,docs)=>{
      if(err){
          res.json({
              code:501,
              msg:"服务端错误"
          })
          return ;
      }else{
          if(docs.length!==0){
            
            res.json({
              code:true,
              department:docs[0].department,
              isload:docs[0].state,
              isadmin:true,
              isreview:a.userid === "04182048"?true:false,
            })
          }else{
            admin.find(obj,(err,dosc)=>{
              if(err){
                res.json({
                  code:502,
                  msg:"服务端错误"
                })
              }else{
                if(dosc.length!==0){
                  res.json({
                    code:true,
                    department:dosc[0].department,
                    isload:true,
                    isadmin:false,
                    isreview:a.userid === "04182048"?true:false,
                  })
                }else{
                  res.json({
                    code:true,
                    department : '',
                    isload:false,
                    isadmin:false,
                    isreview:a.userid === "04182048"?true:false,
                  })
                }
              }
            })
          }
      }
  })
  isreview = false;



}

module.exports = state;