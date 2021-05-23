const mongoose = require('mongoose');
require('dotenv').config();
const mongoLink = process.env.MONGOOSE_CONNECT;

// const mongooseConnect = getenv("mongooseConnect");

const initializeDBConnection = async ()=>{
    // console.log("HI",);
    try{
        await mongoose.connect(mongoLink, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log("mongodb successfully connected");
    }catch(err){
        console.error("mongoose connection failed", err);
    }
}

module.exports = { initializeDBConnection };
