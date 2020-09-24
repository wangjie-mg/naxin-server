const organiza = require("../lib/user.js").organiza;

function removeog(req,res){
    const a = JSON.parse(Object.keys(req.body)[0]);
    const ids = {department:a.department}
    organiza.remove(ids,(err,dosc)=>{
        if(err){
            res.json({
                code:500,
                msg:"删除出错"
            })
        }else{
            res.json({
                code:true,
                msg:"删除成功"
            })
        }
    })
}

module.exports = removeog;