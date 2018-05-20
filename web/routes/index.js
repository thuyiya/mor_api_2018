/*import { APP } from '../../config';

export default (router) => {
  router.route('/').get(function (req, res) {
    res.status(200).json({ code: 2000, message: APP.name + ' api version' + APP.version });
  });

  router.route('/register').get(function(req, res){
    res.send("Hello Resgister!")
  });


  return router;
};*/
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const datamodelds = require('../../datamodels/user');
const token = require('../../config/token');

router.get('/',(req,res)=>{
  res.send("Hello Tidyclean!");
});

router.post('/register',(req,res)=>{
  //console.log(req.body);
  const regUser = new datamodelds({
    fullname:req.body.fullname,
    username:req.body.username,
    email:req.body.email,
    phoneno:req.body.phoneno,
    password:req.body.password
  });
  datamodelds.dbSave(regUser,(err,user)=>{
    if(err){
      res.json({state:false,msg:"data not inserted!"})
    }else{
      res.json({state:true,msg:"data inserted!"})
    }

  })
});

router.post('/login',(req,res)=>{
  //res.send("Hello login!");
  const username = req.body.username;
  const password = req.body.password;

  datamodelds.searchUser(username,function(err,user){
    if(err) throw err;

    if(user){
      //console.log(user);
      datamodelds.matchpassword(password,user.password,function(err,match){
        if(err) throw err;
        if(match){
          console.log({user});
         // res.json({state:true,msg:"Username, password mached!"});
         const obj = { _id: user._id,
          fullname:user.fullname,
          username:user.username,
          email:user.email,
          phoneno:user.phoneno,
          password:user.password,
          __v: user.__v };
      const newtoken = jwt.sign(obj,token.secrete,{expiresIn:86400},(err,newtoken)=>{
        if(err) {throw err;}
        else{
            res.json({
                state:true,
                token:"Bearer "+newtoken,
                user:{
                  id: user._id,
                  fullname:user.fullname,
                  username:user.username,
                  email:user.email,
                  phoneno:user.phoneno,
                }
              })
        }
      });
        }else{
          res.json({state:false,msg:"Wrong password!"});
        }
      })
      
    }else{
      res.json({state:false,msg:"No user found!"});
    }
  })

});


router.get('/profile',token.verifytoken,(req,res)=>{
  var userdata = req.user;
  res.json(userdata);

});

router.get('/about',token.verifytoken,(req,res)=>{
  var userdata = req.user;
  res.send("I'm "+userdata.fullname+". my user name is "+userdata.username);
});

module.exports = router;