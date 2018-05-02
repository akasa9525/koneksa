const mongoose = require('mongoose');
//const answerSchema = require('./answer');
const schema  = mongoose.Schema;

const surveySchema = new schema({
  survey_name:{
    type:String,
    required:[true, 'Survey Name is required']
  },
  question:{
    type:String,
    //category:String,
    required:[true, 'Question is required'],
  },
  //answer: [answerSchema],
  //answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  answer:{
    type:String
  },
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
  /*user:{
    type: [{ type: schema.Types.ObjectId, ref: 'user' }]
  }*/
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
  /*survey: {
    type:[{ type: schema.Types.ObjectId, ref: 'survey' }]
  }*/
  joined_date:{
    type:Date
  }
});
const User =  mongoose.model('user',userSchema);
module.export = User;
const Survey = mongoose.model('survey', surveySchema);

module.exports=Survey;
