
const organiza =require("../lib/user").organiza;
function saveog(req,res){
    const a = JSON.parse(Object.keys(req.body)[0]);
    if(!a.token){
      json({
        code:500,
        msg:"未登录请从企业微信或企业微信号入口进入此次服务"
      })
      return;
    }
    
    organiza.create({
        name:a.name,
        admin:a.admin,
        department:a.department,
        imgurl:a.imgurl,
        desc:a.desc,
        userid:a.userid,
        phone:a.phone,
        state:false,
    },(err, docs) => {
      if (err) {
        res.json({ code: 501, msg: "保存当前用户失败" });
      } else {
        res.json({code:true,msg:"创建社团申请成功"})
      }
    });

}

module.exports = saveog;