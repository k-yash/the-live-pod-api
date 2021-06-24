const express = require('express');
const router = express.Router();
// const {extend} = require('lodash');
const {Playlist} = require('../models/playlist.model');
const {User} = require('../models/signup.model');
const {Video} = require('../models/video.model');


const getOrCreatePlaylistOfUser = async(req, res, next) => {

    try{
        const userId = req.user._id ;
        let playlist = await Playlist.findById(userId);

        if(!playlist){
            const NewPlaylist = new Playlist({_id:userId, playlists:[{title:"Watch later"}]});
            playlist = await NewPlaylist.save();
        }
    
        req.playlist = playlist;
        next();

    }catch(error){
        return res.status(500).json({success:false, error:error.message});

    }
}

router.use(getOrCreatePlaylistOfUser)
router.route('/')
.get(async(req, res)=>{

    try{
        
        let {playlist} = req;
        playlist = await playlist.populate('playlists.videos.video').execPopulate();
        res.json({success:true, response: playlist});
        
    }catch{
        res.status(400).json({success:false, message:"Cannot retrieve liked videos"});
    }
})
//for adding a video to new playlist
.post(async(req, res)=>{
    try{
        const {videoId, playlistName} = req.body;
        let {playlist} = req;
        playlist.playlists.push({title:playlistName, videos:[{video:videoId}]});
        playlist = await playlist.save();
        playlist = await playlist.populate('playlists.videos.video').execPopulate();
        res.json({success:true, response: playlist});
   }catch{
       res.status(500).json({success:false, message:"error in adding to likedVideos"});

   }
})

//adding video to existing playlist
router.route('/:playlistId')
.post(async(req, res)=>{
    try{
        const {videoId} = req.body;
        let {playlist} = req;
        const {playlistId} = req.params;
        // console.log("1hi");

        playlist.playlists.map((lists)=>lists._id == playlistId ? lists.videos.push({video:videoId}) :lists);
        // console.log("2hi");
        // console.log(playlist.playlists[0].videos);
        playlist = await playlist.save();
        // console.log("3hi");
        res.json({success:true, response: playlist});
        // console.log("4hi");
        

    }catch(error){
        console.error(error);
		res.status(400).json({
            status:false,
			message: "An error occurred",
		});
    }

})

.delete(async(req, res)=>{
    try{
        let {playlist} = req;
        const {playlistId} = req.params;
        playlist.playlists = playlist.playlists.filter((list)=>list._id != playlistId);
        playlist = await playlist.save();
        res.json({success:true, response : playlist});


    }catch(error){
        console.log(error);
        res.status(400).json({
            status:false,
			message: "An error occurred in deleting playlist",
		});
    }
})

router.route('/:playlistId/name')
.post(async(req, res)=>{
    try{
        const {newPlaylistName} = req.body;
        const {playlistId} = req.params;
        let {playlist} = req;
        playlist.playlists.map((list)=> list._id == playlistId ? list.title = newPlaylistName : list);
        playlist = await playlist.save();
        res.json({success:true, response : playlist});

    }catch(error){
        console.log(error);
        res.status(400).json({
            status:false,
			message: "An error occurred while changing the name of playlist",
		});
    }

})


// router.param('videoId', async(req, res, next, videoId)=>{
//     try{
//         const video = await Video.findById(videoId);
//         if(!video){
//             throw Error("Video not found");
//         }
//         req.video = video;
//         next();

//     }catch(error){
//         return res.status(400).json({success:false, error:error.message})

//     }
// })


router.route('/:playlistId/:videoId')
.delete(async(req, res)=>{
    try{
        let {playlist} = req;
        const {playlistId, videoId} = req.params;

        playlist.playlists.map((el) => {
			if (String(el._id) === String(playlistId)) {
				return (el.videos = el.videos.filter((vid) => String(vid.video) !== String(videoId)));
			}
			return el;
		});

//         playlist.playlists.map((list)=>list._id == playlistId ?return ({...list,videos: list.videos.filter((vid)=> vid.video != videoId)}): return list);
// console.log(playlist);
// console.log(playlist.playlists[1]);

        // await playlist.playlists.find((play)=>(play._id == playlistId)).find((vid)=>vid.video == videoId).remove();

        playlist = await playlist.save();

        res.json({success:true, response: playlist});

    }catch(error){
        res.json({success:false, response:error.message});
    }
})


module.exports = router;