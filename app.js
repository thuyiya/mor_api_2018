const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./web/routes/user');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/database');

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${PORT}`);
  }
});

const connectDB = mongoose.connect(config.database);
if(connectDB){
  console.log("Database connected")
}else{
  console.log("Warning! Database not connected")
}

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);