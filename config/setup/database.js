const mongoose = require('mongoose');


const connectDB = mongoose.connect("mongodb://localhost:27017/tidyclean",(err)=>{
    if(err){
      console.log("Warning! Database not connected");
    }else{
      console.log("Database connected"); 
    }
    });