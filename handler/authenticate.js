const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const {User} = require('../models/signup.model');


const authenticate = async(req, res, next) =>{
    try{
        const tokenWithBearer = req.headers.authorization;
        if(!tokenWithBearer){
            res.status(401).json({success:false, response:"Unauthorized access token not passed"});
        }
        const token = tokenWithBearer.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.userId);
        if(!user){
            res.status(401).json({success:false, response:"Unauthorized access. Invalid token"});
        }
        req.user = {_id: decoded.userId, name: decoded.name};
        next();


    }catch(error){
        res.status(401).json({success:false, response:error.message});
    }
}

module.exports = {authenticate};


