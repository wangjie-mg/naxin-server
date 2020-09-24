const mongoose = require('./db.js').mongooseuser;

const organizaSchema = mongoose.Schema({
    name:{type:String}, 
    admin:[{type:String}], 
    userid:{type:String}, 
    department:{type:String}, 
    imgurl:{type:String}, 
    phone:{type:String},
    desc:{type:String},
    state:{type:Boolean}
});
const adminSchema = mongoose.Schema({
    name:{type:String}, 
    department:{type:String},
    userid:{type:String}, 
});
const personSchema = mongoose.Schema({
    name:{type:String},
    section:[{type:String}],
    userid:{type:String},
    class:{type:String},
    phone:{type:String},
    desc:{type:String},
    department:{type:String},
});

const organiza = mongoose.model('organiza',organizaSchema,'organiza');
const person = mongoose.model('person',personSchema,'person');
const admin = mongoose.model('admin',adminSchema,'admin');



exports.organiza = organiza;
exports.person = person;
exports.admin = admin;