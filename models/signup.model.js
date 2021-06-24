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
    unique: true,
    validate: {
      validator: function (value) {
        return /^.+@.+\.com$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },

  password:{
    type: String,
    required:[true, "Please enter password"],
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
          value,
        );
      },
      message: (props) =>
        `Password should contain 8 letters(atleast one number, one smallcase and uppercase alphabets)`,
    },
  }
}, {
  timestamps: true,
})


const User = mongoose.model("User", SignupSchema);


module.exports = { User }