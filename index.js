const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {initializeDBConnection} = require('./db/db.connect');

const {errorHandler} = require('./handler/errorHandler');
const {routeHandler} = require('./handler/routeHandler');

const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
initializeDBConnection();


app.get("/", (req,res)=>{
    res.send("Hello World!");
})



//route handler
app.use(routeHandler);

//error handler
app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Express app is listeing on port http://localhost:${PORT}`);
});