const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
const {Schema} = require('mongoose');

const VideoInSavedSchema = new mongoose.Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:'Video',
        required:"please specify the id of video"
    }
})



const SavedVideosSchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:"Please specify the id of User"
    },

    savedVideos: [VideoInSavedSchema]
});

const SavedVideos = mongoose.model("SavedVideos", SavedVideosSchema);
module.exports = {SavedVideos};