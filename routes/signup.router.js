const express = require('express');
const router = express.Router();
const {User} = require('../models/signup.model.js');
const bcrypt = require("bcrypt");

router.route('/')
.get(async (req, res)=>{
  try{
    const users = await User.find({}); 
    res.json({success:true, users});
  }catch(err){
    res.status(500).json({success:false, message: "unable to get users", errorMessage: err.message })

  }
  
})

.post(async(req, res)=>{
  try{
    const user = req.body;
    const emailExsists = await User.exists({ email: user.email });

    if (emailExsists) {
      res.status(409).json({ success: false, message: "Email is already registered." });
      return emailExsists;
    }

    const NewUser = new User(user);
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);
    const savedUser = await NewUser.save();
    res.status(201).json({success:true, user: savedUser})
  }catch(err){
    res.status(500).json({status:false, message:"data not saved", errorMessage:err.message});
  }
})



module.exports = router;