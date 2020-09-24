var express = require('express');
var router = express.Router();

const wxuser =  require('../Api/wxuser')
const wxid =  require('../Api/wxid')
const findog =  require('../Api/findog')
const findperson =  require('../Api/findperson')
const info =  require('../Api/info')
const saveog =  require('../Api/saveog')
const saveperson =  require('../Api/saveperson')
const updateog =  require('../Api/updateog')
const load = require('../Api/load');
const removeog = require('../Api/removeog');
const state = require('../Api/state');
const saveadmin = require('../Api/saveadmin');
const updatedosc = require('../Api/updatedosc');

var bodyParser = require('body-parser');
//中间件使用body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/* GET home page. */
router.post('/wxuser', wxuser);
router.post('/wxid', wxid);
router.post('/findog', findog);
router.post('/findperson', findperson);
router.post('/info', info);
router.post('/saveog', saveog);
router.post('/saveperson', saveperson);
router.post('/updateog', updateog);
router.post('/removeog', removeog);
router.get('/load', load);
router.post('/state', state);
router.post('/saveadmin', saveadmin);
router.post('/updatedosc', updatedosc);





module.exports = router;