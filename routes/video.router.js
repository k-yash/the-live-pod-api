const express = require('express');
const router = express.Router();
const {Video} = require('../models/video.model');

router.route('/')
.get(async(req, res)=>{
    try{
        const videos = await Video.find({});
        res.json({success:true, videos})
    }catch{
        res.status(500).json({success:false, message:"request can't be fulfilled"});
    }
})

.post(async(req, res)=>{
    try{
        const video = req.body;
        const NewVideo = new Video(video);
        const savedVideo = await NewVideo.save();
        res.status(201).json({success:true, product: savedVideo});
    }catch(err){
        res.status(500).json({status:false, message:"data not saved", errorMessage: err.message});
    }
})


module.exports = router;