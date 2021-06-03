const mongoose = require("mongoose");
mongoose.plugin(require('@meanie/mongoose-to-json'));
require('mongoose-type-email');
const SignupSchema = new mongoose.Schema({
  name:{
    type:String,
    required:"Please enter name"
  },

  email:{
    type: mongoose.SchemaTypes.Email,
    required:"Please enter Email",
    unique: true
  },

  password:{
    type: String,
    required:[true, "Please enter password"],
    minLength: [8, "password must be 8 characters long"]
  }
}, {
  timestamps: true,
})


const User = mongoose.model("User", SignupSchema);


module.exports = { User }