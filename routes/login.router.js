const secret = process.env.SECRET;
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {User} = require('../models/signup.model');


router.route('/')
.get((req,res)=>{
  res.json("login in build");
})

.post(async(req, res)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
      const validPassword = await bcrypt.compare(password, user.password);
      if(validPassword){
        const token = jwt.sign({userId: user._id, name: user.name}, secret, {expiresIn: "24h"});
        res.json({success:true, response:{userId: user._id, name:user.name,  token } })
      }else{
        res.status(401).json({success:false, message:"Email or Password is incorrect"})
    }
    }else{
    res.status(401).json({ message: 'Email or password is incorrect!' });
    }
  }catch(err){
     res.status(500).json({success:false, message:"cannot retrieve from server", errorMessage: err.message})
}})


module.exports = router;