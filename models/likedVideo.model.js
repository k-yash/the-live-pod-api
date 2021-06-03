const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
const {Schema} = require('mongoose');

const VideoInLikedVidSchema = new mongoose.Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:'Video',
        required:"please specify the id of video"
    }
})



const LikedVideosSchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:"Please specify the id of User"
    },

    likedVideos: [VideoInLikedVidSchema]
});

const LikedVideos = mongoose.model("LikedVideos", LikedVideosSchema);
module.exports = {LikedVideos};