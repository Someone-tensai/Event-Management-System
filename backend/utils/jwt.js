const jwt = require('jsonwebtoken');
const config =require('../config/config');

const generateToken = (user)=>{
    const payload ={
        user_id: user.id,
        email:user.email,
        role: user.role
    };

    return jwt.sign(payload,config.jwt.secret,{
        expiresIn: config.jwt.expiresIn
    });
};

/**
 * verify jwt token 
 */

const verifyToken=(token)=>{
    return jwt.verify(token,config.jwt.secret);
};


const decodeToken=(token)=>{
    return jwt.decode(token);
};

module.exports={
    generateToken,
    verifyToken,
    decodeToken
};