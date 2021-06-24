const express = require('express');
const router = express.Router();
// const {extend} = require('lodash');
const {LikedVideos} = require('../models/likedVideo.model');
const {User} = require('../models/signup.model');
const {Video} = require('../models/video.model');


const getOrCreateLikedVideosOfUser = async(req, res, next) => {
    try{
        const userId = req.user._id ;
        let likeVideos = await LikedVideos.findById(userId);

        if(!likeVideos){
            const NewLikeVideos = new LikedVideos({_id:userId});
            likeVideos = await NewLikeVideos.save();
        }

        req.likeVideos = likeVideos;
        next();

    }catch(error){
        return res.status(500).json({success:false, error:error.message});

    }
}

router.use(getOrCreateLikedVideosOfUser)

router.route('/')
.get(async(req, res)=>{
    try{
        let {likeVideos} = req;
        likeVideos = await likeVideos.populate('likedVideos.video').execPopulate();
        res.json({success:true, response:likeVideos});
        
    }catch{
        res.status(400).json({success:false, message:"Cannot retrieve liked videos"});
    }
})

.post(async(req, res)=>{
    try{
        const {videoId} = req.body;
        let {likeVideos} = req;
        likeVideos.likedVideos.push({video:videoId});
        likeVideos = await likeVideos.save();

        res.json({success:true, response:likeVideos});
   }catch{
       res.status(500).json({success:false, message:"error in adding to likedVideos"});

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


router.route('/:videoId')
.delete(async(req, res)=>{
    try{
        let {likeVideos} = req;
        const {videoId} = req.params;

        await likeVideos.likedVideos.find((vid)=>(vid.video == videoId)).remove();

        likeVideos = await likeVideos.save();

        res.json({success:true, response: likeVideos});

    }catch(error){
        res.json({success:false, response:error.message});
    }
})


module.exports = router;