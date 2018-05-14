const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:Number,required:true},
    password:{type:String,required:true}

});

module.exports = mongoose.model("datamodels",userSchema);

module.exports.dbSave = function(regUser,callback){
   // console.log({regUser});

   bcrypt.genSalt(10, function(err, salt) {
       bcrypt.hash(regUser.password, salt, function(err, hash) {
           //console.log(hash);
           regUser.password = hash;
           if(err){
                throw err;
           }else{
           regUser.save(callback);
           }
       });
   });
};