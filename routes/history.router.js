const express = require('express');
const router = express.Router();
// const {extend} = require('lodash');
const {History} = require('../models/history.model');
const {User} = require('../models/signup.model');
const {Video} = require('../models/video.model');


const getOrCreateHistoryOfUser =  async(req, res, next)=>{
    try{
        const userId = req.user._id ;
        let historyOfUser = await History.findById(userId);

        if(!historyOfUser){
            const NewHistoryOfUser = new History({_id:userId});
            historyOfUser = await NewHistoryOfUser.save();
        }

        req.historyOfUser = historyOfUser;
        next();

    }catch(error){
        return res.status(500).json({success:false, error:error.message});

    }
}

router.use(getOrCreateHistoryOfUser)
router.route('/')
.get(async(req, res)=>{
    try{
        let {historyOfUser} = req;
        historyOfUser = await historyOfUser.populate('historyVideos.video').execPopulate();
        res.json({success:true, response: historyOfUser});
        
    }catch{
        res.status(400).json({success:false, message:"Cannot retrieve History of User"});
    }
})

.post(async(req, res)=>{
    try{
        const {videoId} = req.body;
        let {historyOfUser} = req;
        historyOfUser.historyVideos.push({video:videoId});
        historyOfUser = await historyOfUser.save();

        res.json({success:true, response:historyOfUser});
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
        let {historyOfUser} = req;
        const {videoId} = req.params;

        await historyOfUser.historyVideos.find((vid)=>(vid.video == videoId)).remove();

        historyOfUser = await historyOfUser.save();

        res.json({success:true, response: historyOfUser});

    }catch(error){
        res.json({success:false, response:error.message});
    }
})


module.exports = router;