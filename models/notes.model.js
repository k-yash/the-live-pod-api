const mongoose = require('mongoose');
mongoose.plugin(require('@meanie/mongoose-to-json'));
const {Schema} = require('mongoose');

const NotesSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:"Please specify the id of User"
    },

    videoId:{
        type: Schema.Types.ObjectId,
        ref:'Video',
        required:"Please specify the id of video"
    },

    title:{
        type:String,
        trim : true
    },

    description : {
        type:String,
        trim:true
    }
    
}, {
    timestamps: true,
  })



const Note = mongoose.model("Notes", NotesSchema);
module.exports = {Note};