const express = require('express');
const router = express.Router();
const {User} = require('../models/signup.model.js');

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
    const NewUser = new User(user);
    const savedUser = await NewUser.save();
    res.status(201).json({success:true, user: savedUser})
  }catch(err){
    res.status(500).json({status:false, message:"data not saved", errorMessage:err.message});
  }
})



module.exports = router;