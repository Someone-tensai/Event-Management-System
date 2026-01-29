const jwt = require('jsonwebtoken');
const config =require('../config/config');


// Generate jwt token
const generate_token = (user)=>{
    const payload ={
        user_id: user.user_id,
        email:user.email,
    };

    return jwt.sign(payload,config.jwt.secret,{
        expiresIn: config.jwt.expiresIn
    });
};

/**
 * verify jwt token 
 */

const verify_token=(token)=>{
    return jwt.verify(token,config.jwt.secret);
};


const decode_token=(token)=>{
    return jwt.decode(token);
};

module.exports={
    generate_token,
    verify_token,
    decode_token
};