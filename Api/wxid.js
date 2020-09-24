const https = require("https");
const  admin  = require("../lib/user.js").admin;
const organiza = require("../lib/user.js").organiza;

function wxid(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]),
        option = new URL(
          "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wxe0957da43aa7e2c3&corpsecret=nS8zz7xZMexyldF4Kwn8rTSHaVKKUxLuob9qJON3Ygg"
        );
        
  https.get(option, (req) => {
    var dataString = "";
    req.on("data", function (data) {
      dataString += data;
    });
    req.on("end", function () {
      const reqa = JSON.parse(dataString);
      
      if (reqa.errcode === 0) {
        const useroption = new URL(
          "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" +
            reqa.access_token +
            "&code=" +
            a.code
        );
        https.get(useroption, (reqb) => {
          let tring = "";
          reqb.on("data", function (data) {
            tring += data;
          });
          reqb.on("end", function () {

          const user = JSON.parse(tring);
           
            
          const obj = {
            userid:user.UserId,
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
                      token:reqa.access_token,
                      userid:user.UserId,
                      department:docs[0].department,
                      isload:docs[0].state,
                      isadmin:true,
                      isreview:user.UserId==="04182048"?true:false,
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
                            token:reqa.access_token,
                            userid:user.UserId,
                            department:dosc[0].department,
                            isload:true,
                            isadmin:false,
                            isreview:user.UserId==="04182048"?true:false,
                          })
                        }else{
                          res.json({
                            code:true,
                            token:reqa.access_token,
                            department : '',
                            userid:user.UserId,
                            isload:false,
                            isadmin:false,
                            isreview:user.UserId==="04182048"?true:false,
                          })
                        }
                      }
                    })
                  }
              }
          })

          });
        });
      }
    });
  });
}

module.exports = wxid;