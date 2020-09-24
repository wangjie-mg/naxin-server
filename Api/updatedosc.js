const organiza = require("../lib/user.js").organiza;


function updatedosc(req,res){
    const a = JSON.parse(Object.keys(req.body)[0]);
    
    const ids = {department:a.department}
    organiza.findOneAndUpdate(ids,{$set:{desc:a.desc}},{new:true},(err,dosc)=>{
        if(err){
            res.json({code:500,msg:"审核错误，更新错误"});
        }else{
            
            res.json({code:true,msg:"申请该社团成功"});
        }
    })
}

module.exports = updatedosc;