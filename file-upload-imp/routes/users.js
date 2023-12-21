const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plm=require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/pintrest")
// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  }
  ],
  dp: {
    type: String, // Assuming dp is a URL to the display picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm)
// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
