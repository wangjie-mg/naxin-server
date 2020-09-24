const person = require("../lib/user.js").person;
var xlsx = require("xlsx");
var path = require("path");
const fs = require("fs");
function getTextByJs(arr) {
  var str = "";
  for (let i = 0; i < arr.length; i++) {
   
    str += arr[i] + ",";
  }
  if (str.length > 0) {
    str = str.substr(0, str.length - 1);
  }
  return str;
}
function load(req,res) {
  const obj = { department: req.query.department };
  person.find(obj, (err, docs) => {
    if (err) {
      res.json({
        code: 501,
        msg: "查询出现错误",
      });
    } else {
      if(docs){
      var arrayData = [
          ["姓名", "部门", "学号", "专业班级", "电话", "个人介绍", "社团"],
        ],
        obj = {};
      for (let i = 0; i < docs.length; i++) {
        obj = docs[i];
        const arr=[obj.name,getTextByJs(obj.section),obj.userid,obj.class,obj.phone,obj.desc,obj.department]
        arrayData.push(arr);
      }
      let arrayWorkSheet = xlsx.utils.aoa_to_sheet(arrayData);
      let workBook = {
        SheetNames: ["arrayWorkSheet"],
        Sheets: {
          arrayWorkSheet: arrayWorkSheet,
        },
      };
      let worksheet = workBook.Sheets["arrayWorkSheet"];
      
      worksheet["!rows"] = [
        {
          hpx: 30,
        },
      ];
      worksheet["!cols"] = [
        {
          wpx: 80,
          align: "center",
        },
        {
          wpx: 80,
        },
        {
          wpx: 80,
        },
        {
          wpx: 80,
        },
        {
          wpx: 80,
        },
        {
          wpx: 150,
        },
        {
          wpx: 150,
        },
      ];
      const excelPath = path.resolve(__dirname, "../public/md.xlsx");
      xlsx.writeFile(workBook, excelPath);
      res.download(path.resolve(__dirname, "../public/md.xlsx"), "社团报名名单.xlsx", (err) => {
        if (!err) {
          fs.unlinkSync(path.resolve(__dirname, "../public/md.xlsx"));
        } else {
          consoel.log("下载失败");
        }
      });
      
    }

    }
  });
}

module.exports = load;
