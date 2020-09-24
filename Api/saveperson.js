const person  = require("../lib/user.js").person;


function saveperson(req,res){
  const a = JSON.parse(Object.keys(req.body)[0]);

    person.create({
        name:a.name,
        section:a.section,
        userid:a.userid,
        class:a.class,
        phone:a.phone,
        desc:a.desc,
        department:a.department,
    },(err, docs) => {
      if (err) {
        res.json({ code: 501, msg: "网络错误，申请该社团失败，请重新提交" });
      } else {
        res.json({code:true,msg:"申请该社团成功"})
      }
    });
}
module.exports=saveperson