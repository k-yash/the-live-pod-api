const express = require('express');
const router = express.Router();
const {User} = require('../models/signup.model')

const logger = async(req, res, next) =>{
  try{
    const {email} = req.body;
    const query = await User.find({email});

    if (!query) { 
          return res.status(400).json({ success: false, message: "error getting user details"})
        }

    req.query = query; 
    next();
  }catch{
    res.status(404).json({success:false, message:"user not found"});
  }
}

router.use('/',logger);
router.route('/')
.get((req,res)=>{
  res.json("login in build");
})

.post(async(req, res)=>{
  try{
  const {password} = req.body;
  const {query} = req;
  // console.log(query)
  if(password === query[0].password){
      return res.json({success:true,userId:query[0]._id,name: query[0].name,  message:"user credentials found"}); 
  }else{
    return res.status(400).json({ success: false, message: "error getting user details"})
  }
  }catch(err){
  res.status(500).json({success:false, message:"cannot retrieve from server", errorMessage: err.message})
}})


module.exports = router;