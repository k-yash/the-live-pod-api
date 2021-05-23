const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.get("/users", (req, res)=>{
    res.json({message:"sever connected successfully"});
})


app.get("/profile", (req, res)=>{
    res.json({message:"you are on profile page"});
})

app.listen(port, ()=>{
    console.log(`Express app is listeing on port http://localhost:${port}`);
});