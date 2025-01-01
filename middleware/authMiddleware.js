const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.header('Authorization');
}