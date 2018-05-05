const mongoose = require('mongoose');
//const answerSchema = require('./answer');
const schema  = mongoose.Schema;


const surveySchema = new schema({
  survey_name:{
    type:String,
    required:[true, 'Survey name required']
  },
  question:[{
    que:String,
    answer:[{ans:{type:String}, response:[{type:String}]}]
  }],
  frequency:{
    type:String,
    required:[true, 'frequency is required']
  },
  launch_time:{
    type:Date,
    required:[true, 'launch_time is required']
  },
  due_time:{
    type:Date,
    required:[true, 'due_time is required']
  },
  issue_num:{
    type:Number,
    required:[true, 'issue_num is required']
  }
});


const userSchema = new schema({
  id:{
    type:String,
    required:[true, 'user_id required']
  },
  timezone:{
    type:String,
    required:[true, 'timezone required']
  },
  joined_date:{
    type:Date
  }
});


const User =  mongoose.model('user',userSchema);
module.export = User;
const Survey = mongoose.model('survey', surveySchema);
module.exports=Survey;
