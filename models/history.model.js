const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
const {Schema} = require('mongoose');

const VideoInHistorySchema = new mongoose.Schema({
    video:{
        type:Schema.Types.ObjectId,
        ref:'Video',
        required:"please specify the id of video"
    }
})



const HistorySchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:"Please specify the id of User"
    },

    historyVideos: [VideoInHistorySchema]
});

const History = mongoose.model("History", HistorySchema);
module.exports = {History};