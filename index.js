const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.get("/users", (req, res)=>{
    res.json({message:"sever connected successfully"});
})


app.listen(port, ()=>{
    console.log(`Express app is listeing on port http://localhost:${port}`);
});