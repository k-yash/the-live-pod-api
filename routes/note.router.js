const express = require('express');
const router = express.Router();
const {Note} = require('../models/notes.model');
const {Video} = require('../models/video.model');
const {User} = require('../models/signup.model');
const { extend } = require('lodash');


router.route('/:videoId')
.get(async(req, res)=>{
    try{
        const userId = req.user._id ;
        const {videoId} = req.params;
        const notes = await Note.find({videoId, userId});
        res.json({success:true, response: notes});


    }catch(error){
        res.status(500).json({success:false, response:error.message})
    }
})

.post(async(req, res)=>{
    try{ 
        const {videoId} = req.params;
        const userId = req.user._id ;
        const noteData = req.body;
        let note = new Note({
            userId: userId,
            videoId : videoId,
           ...noteData
        });
        note = await note.save();
        res.status(201).json({success: true, response: note});

    }catch(error){
        res.status(500).json({success:false, response: error.message})
    }
})

router.param('noteId', async (req, res, next, noteId)=>{

        const note = await Note.findById(noteId);
        if(!note){
            res.status(500).json({success:false, response: "invalid id of note"})
        }
        req.note = note;
        next();
})

router.route('/:videoId/:noteId')
.post(async(req, res)=>{
    try{
        const updatedNote = req.body;
        let {note} = req;
        note = extend(note, updatedNote);
        note = await note.save();
        res.json({success:true, response: note});
    }catch(error){
        res.status(500).json({success:false, response: error.message});
    }
})

.delete(async(req, res)=>{
    try{
        let {note} = req;
        note = await note.remove();
        res.json({success:true, response: note})

    }catch(error){
        res.status(500).json({success: false, response: error.message});
    }
    
})
    

module.exports = router;