const express = require('express');
const router = express.Router();
// const {extend} = require('lodash');
const {SavedVideos} = require('../models/savedVideo.model');
const {User} = require('../models/signup.model');
const {Video} = require('../models/video.model');


router.param("userId", async(req, res, next, userId)=>{
    try{
        const user = await User.findById(userId);
        if(!user){
            res.status(400).json({success:false, message:"User not found"});
        }

        let saveVideos = await SavedVideos.findById(userId);

        if(!saveVideos){
            const NewSaveVideos = new SavedVideos({_id:userId});
            saveVideos = await NewSaveVideos.save();
        }

        req.saveVideos = saveVideos;
        next();

    }catch(error){
        return res.status(500).json({success:false, error:error.message});

    }
})

router.route('/:userId')
.get(async(req, res)=>{
    try{
        let {saveVideos} = req;
        saveVideos = await saveVideos.populate('savedVideos.video').execPopulate();
        res.json({success:true, response: saveVideos});
        
    }catch{
        res.status(400).json({success:false, message:"Cannot retrieve saved videos"});
    }
})

.post(async(req, res)=>{
    try{
        const {videoId} = req.body;
        let {saveVideos} = req;
        saveVideos.savedVideos.push({video:videoId});
        saveVideos = await saveVideos.save();

        res.json({success:true, response: saveVideos});
   }catch{
       res.status(500).json({success:false, message:"error in adding to savedVideos"});

   }
})

router.param('videoId', async(req, res, next, videoId)=>{
    try{
        const video = await Video.findById(videoId);
        if(!video){
            throw Error("Video not found");
        }
        req.video = video;
        next();

    }catch(error){
        return res.status(400).json({success:false, error:error.message})

    }
})


router.route('/:userId/:videoId')
.delete(async(req, res)=>{
    try{
        let {saveVideos} = req;
        const {videoId} = req.params;

        await saveVideos.savedVideos.find((vid)=>(vid.video == videoId)).remove();

        saveVideos = await saveVideos.save();

        res.json({success:true, response: saveVideos});

    }catch(error){
        res.json({success:false, response:error.message});
    }
})


module.exports = router;