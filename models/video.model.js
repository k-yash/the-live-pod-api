const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));

const VideoSchema = new mongoose.Schema({

    videoId:{
        type:String,
        required:"Please enter videoId"
    },

    name:{
        type:String,
        required:"Please enter name"
    },

    creator:{
        type:String,
        required:"Please enter creatorName"
    },

    videoType:{
        type:String,
        required:"Please enter the type of the video"
    }

    // description:{
    //     type:String,
    //     required:"Please enter the description for the video"
    // }

}, {
    timestamps:true,
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = {Video};