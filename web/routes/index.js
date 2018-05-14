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
const router = express.Router();
const datamodelds = require('../../datamodels/user');

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
      console.log(user);
    }
  })

});

router.get('/about',(req,res)=>{
  res.send("Hello about!");
});

module.exports = router;