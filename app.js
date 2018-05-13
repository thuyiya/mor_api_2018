const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const user = require('./web/routes');

http.createServer(app).listen(port,(err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log("App listen to port:"+port);
  }
});

app.use(express.static(path.join(__dirname,"public")));
/*
app.get('/',(req,res)=>{
  res.send("Hello App!");
});*/

app.use('/',user);
