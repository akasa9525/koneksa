const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//set up express app
const app = express();
mongoose.connect('mongodb://localhost/surveydb');
mongoose.Promise=global.Promise;

app.use(bodyParser.json());

app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
  res.status(422).send({error:err.message});
});

// listen for request
app.listen(process.env.port || 4000,function(){
  console.log('Now Listening for requests !!');
});
