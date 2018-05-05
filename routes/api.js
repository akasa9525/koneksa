const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');
const moment = require('moment-timezone');
//const Survey = require('../model/surveys');
const db_model = require('../model/surveys');
var Survey = Mongoose.model('survey');
var User = Mongoose.model('user');
/*var Question = Mongoose.model('question');*/
var Answer = Mongoose.model('answer');

router.get('/surveys',function(req,res,next){
  User.find({id:req.query.id}).then(function(user){
    res.send(user);
  })
});

// User submitting there response for a survey
router.post('/surveys/submit',function(req,res,next){
  var sname= req.body.sname;
  var q = req.body.que;
  var u_id = req.body.user_id;
  var ans = req.body.ans;
  //console.log(sname);
  //res.send({ret:u_id});
  Survey.findOne({survey_name:sname},function(err,doc){
    var que=doc.question;

    var freq = doc.frequency;
    if(freq=="weekly"){
    for(i=0; i<que.length; i++){
      console.log(que[i]);
      if(que[i].que == q){
        var answ = que[i].answer;
        console.log(que[i].answer);
        for(j=0;j<answ.length; j++){
          if(answ[j].ans==ans){
            que[i].answer[j]["response"].push(u_id);
            //que[i].ans1.response=u_id;
            doc.save(function(er,y){
              if(er)
              res.send(er.message);
              console.log("answer recorded for user "+u_id);
              res.send(y);
            });
          }
        }
        /*
        if (que[i].ans1.ans == ans){
          //que[i].ans1.response.append(u_id);
          que[i].ans1["response"].push(u_id);
          //que[i].ans1.response=u_id;
          doc.save(function(er,y){
            if(er)
            res.send(er.message);
            console.log("answer recorded for user "+u_id);
            res.send(y);
          });
        }
        if (que[i].ans2.ans == ans){
          que[i].ans2.response=u_id;
          doc.save(function(er,y){
            if(er)
            res.send(er.message);
            console.log("answer recorded for user "+u_id);
            res.send(y);
          });
        }
        if (que[i].ans3.ans == ans){
          que[i].ans3.response=u_id;
          doc.save(function(er,y){
            if(er)
            res.send(er.message);
            console.log("answer recorded for user "+u_id);
            res.send(y);
          });
        }
        if (que[i].ans4 == ans){
          que[i].ans3.response=u_id;
          doc.save(function(er,y){
            if(er)
            res.send(er.message);
            console.log("answer recorded for user "+u_id);
            res.send(y);
          });
        }*/
      }
      else{
        res.send({"Msg":"Question Not Found!!"})
      }
    }
  }
  else{
    for(i=0; i<que.length; i++){
      if(que[i].que == q){
        var tmp = {"ans":ans, "response":u_id};
        que[i].answer.push(tmp);
        //que[i].answer["response"].push(u_id);
        doc.save(function(er,y){
          if(er)
          res.send(er.message);
          console.log("answer recorded for user "+u_id);
          res.send(y);
        });
      }
      else{
        res.send({"Msg":"Question Not Found!!"})
      }
    }
  }
    //res.send({"res":"nomatch"});
  });


});


router.get('/surveys/fetch',function(req,res,next){
  User.find({id:req.query.id}).then(function(user){
    console.log(user[0].id);
    var tzone = user[0].timezone;
    var joined_date = user[0].joined_date;
    //console.log(joined_date);
    joined_date = moment(joined_date);
    //console.log(joined_date.tz(tzone));
    joined_date = joined_date.tz(tzone)
    var cur_time = Date.now();
    cur_time = moment(cur_time);
    //console.log(cur_time.tz(tzone));
    cur_time = cur_time.tz(tzone)
    var duration = moment.duration(cur_time.diff(joined_date));
    //console.log(duration.asDays());
    duration = duration.asDays();
    if(duration>=1){
      if((cur_time.format('HH:mm')).toString()>'09:59' && (cur_time.format('HH:mm')).toString()<'12:01'){
        //search for both weekly and daily
        //console.log("both");
        Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}],$or:[{"frequency":"daily"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
          res.send(sur);
        })
      }
      else{
        //console.log("daily");
        Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
          res.send(sur);
        })
      }
    }
    else{
      //console.log("outer else daily");
      Survey.find({$and:[{"frequency":"weekly"},{"due_time":{"$gte":new Date(Date.now())}}]}).then(function(sur){
        res.send(sur);
      })
    }
    //res.send(user);
  })
});



router.post('/surveys/create_survey',function(req,res,next){
  //Survey.findOneAndUpdate({"survey_name":req.body.survey_name},{""})
  var sur = new Survey({
    survey_name:req.body.survey_name,
    question: req.body.question,
    frequency:req.body.frequency,
    launch_time:req.body.launch_time,
    due_time:req.body.due_time,
    issue_num:req.body.issue_num
  });
  sur.save().then(function(sur){
    res.send(sur);
  });
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
