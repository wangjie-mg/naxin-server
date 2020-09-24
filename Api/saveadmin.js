// const organiza = require("../lib/user.js").organiza;
const admin = require("../lib/user.js").admin;

function updatedosc(req,res){
    const a = JSON.parse(Object.keys(req.body)[0]);
    const array=[];
   
    a.list.map((item,index)=>{
        array.push(
           Object.assign(item,{department:a.department})
          )
        });
    admin.insertMany(array,(err)=>{
        if(err){
            res.json({code:500,msg:"审核错误，更新错误"});
        }else{
        res.json({code:true,msg:"申请该社团成功"})
        }
    })
}

module.exports = updatedosc;