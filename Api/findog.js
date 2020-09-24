const organiz = require("../lib/user.js").organiza;
function findog(req, res) {
  
  const a = JSON.parse(Object.keys(req.body)[0]);

 
  var obj={};
  if(a.department && a.department!=="all"){
    obj={
      department:a.department
    }
  }else if(a.department==="all"){
    obj = {state:false}
  }else{
    obj = {state:true};
  }
  organiz.find(obj,(err,docs)=>{
    if(err){
      res.json({
        code:501,
        msg:"查询出现错误"
      })
    } else {
      res.json({
        code:true,
        organiza: docs,
      })
    }
  })
}

module.exports = findog;