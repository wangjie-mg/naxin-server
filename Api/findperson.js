const person = require("../lib/user.js").person;
function findperson(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  const obj = {department:a.department};
  person.find(obj,(err,docs)=>{
    if(err){
      res.json({
        code:501,
        msg:"查询出现错误"
      })
    } else {
      res.json({
        code:true,
        person: docs,
      })
    }
  })
}

module.exports = findperson;