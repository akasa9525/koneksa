const mongoose = require('mongoose');
const  schema  = mongoose;
const userSchema = new schema({
  id:{
    type:String,
    required:[true, 'user_id required']
  },
  timezone:{
    type:String,
    required:[true, 'timezone required']
  },
  survey: [{ type: schema.Types.ObjectId, ref: 'survey' }]
});
const User =  mongoose.model('user',userSchema);
module.export = User;
