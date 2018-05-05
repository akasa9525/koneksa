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
    /*ans1:{type:String, response:[{type: schema.Types.ObjectId, ref:'user'}]},
    ans2:{type:String, response:[{type: schema.Types.ObjectId, ref:'user'}]},
    ans3:{type:String, response:[{type: schema.Types.ObjectId, ref:'user'}]},
    ans4:{type:String, response:[{type: schema.Types.ObjectId, ref:'user'}]}*/
    /*ans1:{ans:{type:String}, response:[{type:String}]},
    ans2:{ans:{type:String}, response:[{type:String}]},
    ans3:{ans:{type:String}, response:[{type:String}]},
    ans4:{ans:{type:String}, response:[{type:String}]}*/
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

/*
const surveySchema = new schema({
  survey_name:{
    type:String,
    required:[true, 'Survey Name is required']
  },
  question:{
    //type:String,
    //category:String,
    //required:[true, 'Question is required'],
    questions:[{type: schema.Types.ObjectId, ref:'question'}]
  },
  //answer: [answerSchema],
  //answer: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],

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
});*/

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

const questionSchema = new schema({
  question:{
    type:String,
    required:[true, 'question is required']
  },
  answers:{
    type:[{type: schema.Types.ObjectId, ref:'answer'}]
  }
});

const answerSchema = new schema({
  answer:{
    type:String
  },
  response:{

  type: [{type:schema.Types.ObjectId, ref:'user'}]
  }
});
const Answer = mongoose.model('answer',answerSchema);
module.exports=Answer;
const User =  mongoose.model('user',userSchema);
module.export = User;
const Survey = mongoose.model('survey', surveySchema);
module.exports=Survey;
const Question = mongoose.model('question', questionSchema);
module.exports=Question;
