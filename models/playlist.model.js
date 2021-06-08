const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
const {Schema} = require('mongoose');

const PlaylistNameSchema = new mongoose.Schema({
    title:{
        type:String,
        required: "Name if playlist is required"
    },

    videos:[{
        video:{
        type: Schema.Types.ObjectId,
        ref:'Video',
        required:"please specify the id of video"}
    }]
})



const PlaylistSchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:"Please specify the id of User"
    },

    playlists: [PlaylistNameSchema]
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = {Playlist};