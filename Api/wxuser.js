const https = require("https");

function wxuser(req, res) {
  // if(!req.cookies['token']){
  //   json({
  //     code:500,
  //     msg:"未登录或登录过期"
  //   })
  //   return;
  // }
    const a = JSON.parse(Object.keys(req.body)[0]);
    var  token;
    
    if(a.token){
         token = a.token;
    }else{
        const option = new URL(
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
                token = reqa.access_token;
              }
            });
        });
    }
    
    const useroption = new URL(
        "https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=" +
          token +
          "&userid=" +
          a.userid
    );
    https.get(useroption, (reqb) => {
        let tring = "";
        reqb.on("data", function (data) {
          tring += data;
        });
        reqb.on("end", function () {
          const user = JSON.parse(tring);

              
            if (user.errcode === 0) {
                const user = JSON.parse(tring);
                res.json({
                    code: true,
                    userid:user.UserId,
                    name:user.name,
                    mobile:user.mobile,
                    department:user.department
                });
            }
        });
    });


}

module.exports =wxuser;