const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:Number,required:true},
    password:{type:String,required:true}

});

module.exports = mongoose.model("User",userSchema);