const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next){
    const token = req.header('Authorization');
    if(!token) res.status(401).json({error: 'Access denied'});
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }catch(err){
        res.status(401).json({error:'Invalid token'});
    }

};

module.exports = verifyToken;