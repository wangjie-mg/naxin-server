const organiza = require("../lib/user.js").organiza;
const admin = require("../lib/user.js").admin;

function updateog(req,res){
    const a = JSON.parse(Object.keys(req.body)[0]);
    const ids = {department:a.department}
    organiza.findOneAndUpdate(ids,{$set:{state:true}},{new:true},(err,dosc)=>{
        if(err){
            res.json({code:500,msg:"审核错误，更新错误"});
        }else{
            admin.create({
                name:dosc.name,
                userid:dosc.userid,
                department:dosc.department,
            },(err,docs)=>{
                if (err) {
                    res.json({ code: 501, msg: "网络错误" });
                  } else {
                    res.json({code:true,msg:"申请该社团成功"})
                  }
            })
        }
    })
}

module.exports = updateog;