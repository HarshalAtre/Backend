const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const plm=require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/strinja")
const UserSchema = new Schema({
  username: {
    type: String,
  },
  name:String,
  password: {
    type: String,
  },
  email: {
    type: String,
  },
   profileImage:String,
  contact : { 
    type: Number,
  },
  boards:{
    type:Array,
    default:[]
  },
  posts:[{
    type:Schema.Types.ObjectId,
    ref:'post'
  }]
})
UserSchema.plugin(plm);
module.exports=mongoose.model('user', UserSchema);