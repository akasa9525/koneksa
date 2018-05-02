const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const moment = require('moment-timezone');
//const Survey = require('../model/surveys');
const db_model = require('../model/surveys');
var Survey = Mongoose.model('survey');
var User = Mongoose.model('user');
router.get('/surveys',function(req,res,next){
  User.find({id:req.query.id}).then(function(user){
    res.send(user);
  })
});

router.get('/surveys/fetch',function(req,res,next){
  User.find({id:req.query.id}).then(function(user){
    console.log(user[0].id);
    var tzone = user[0].timezone;
    var joined_date = user[0].joined_date;
    console.log(joined_date);
    joined_date = moment(joined_date);
    console.log(joined_date.tz(tzone));
    joined_date = joined_date.tz(tzone)
    var cur_time = Date.now();
    cur_time = moment(cur_time);
    console.log(cur_time.tz(tzone));
    cur_time = cur_time.tz(tzone)
    var duration = moment.duration(cur_time.diff(joined_date));
    console.log(duration.asDays());
    duration = duration.asDays();
    if(duration>=1){
      if((cur_time.format('HH:mm')).toString()>'09:59' && (cur_time.format('HH:mm')).toString()<'12:01'){
        //search for both weekly and daily
        console.log("both");
        Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}],$or:[{"frequency":"daily"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
          res.send(sur);
        })
      }
      else{
        console.log("daily");
        Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
          res.send(sur);
        })
      }
    }
    else{
      console.log("outer else daily");
      Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
        res.send(sur);
      })
    }
    //res.send(user);
  })
});

/*router.post('/surveys',function(req,res,next){
  Survey.create(req.body).then(function(survey){
    res.send(survey);
  });
  console.log("post success");
});*/

router.post('/surveys/create_survey',function(req,res,next){
    var survey = new Survey(req.body);
    survey.save().then(function(survey){
      console.log("new survey created");
      console.log(survey);
      res.send(survey);
    })
});

router.post('/surveys/create_user',function(req,res,next){
    //var user = new User(req.body);
    /*user.save().then(function(user){
      console.log(req.body.id);
      console.log(user);
    });*/
    var temp = req.body;
    temp["joined_date"]=Date();
    var user = new User(temp);
    user.save().then(function(user){
      res.send(temp);
    });
});

module.exports = router;
