const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = require('./routers/leaderRouter');
const userRouter = require('./routers/userRouter');
const dotenv = require('dotenv');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const SpotModel = require('./models/spotModel');
const SpotUserModel = require('./models/spotUserModel');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',leaderRouter);
app.use('/',userRouter);

app.get('/',(req,res)=>{
  res.send('Welcome to Trudd');
});

module.exports = server;