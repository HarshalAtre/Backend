const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  user: {
    type:Schema.Types.ObjectId ,
    ref: 'user' // user model
  },
  image:String,
  description: {
    type: String,
  },
  title: {
    type: String,
  },

})
module.exports=mongoose.model('post', PostSchema);