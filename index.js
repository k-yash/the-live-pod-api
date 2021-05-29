const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {initializeDBConnection} = require('./db/db.connect');

const {errorHandler} = require('./handler/errorHandler');
const {routeHandler} = require('./handler/routeHandler');

const videos = require('./routes/video.router');
const login = require("./routes/login.router");
const signup = require("./routes/signup.router");
const likedVideos = require('./routes/likedVideos.router');
const history = require('./routes/history.router');
const savedVideos = require('./routes/savedVideo.router');

const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();


app.get("/", (req,res)=>{
    res.send("Hello Express app!");
})

app.use('/videos', videos);
app.use('/login',login);
app.use('/signup', signup);
app.use('/likedvideos', likedVideos);
app.use('/history', history);
app.use('/savedvideos', savedVideos);



//route handler
app.use(routeHandler);

//error handler
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Express app is listeing on port http://localhost:${PORT}`);
});