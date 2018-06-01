const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
var blacklist = require('express-jwt-blacklist');

const app = express();
const user = require('./web/routes');
const config = require('./config/setup/database');
const port = process.env.PORT || 3000;

http.createServer(app).listen(port,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log("App listen to port:"+port);
  }
});



app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
app.get('/',(req,res)=>{
  res.send("Hello App!");
});*/

app.use('/',user);

app.use(passport.initialize());
app.use(passport.session());

