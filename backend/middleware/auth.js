const{verifyToken}=require('../utils/jwt');
const app_error = require("../errors/app_error")
const pool =require('../db/pool');

//middleware to authenticate user to verify token and attach to rquest

const authenticate=async(req,res,next)=>{
    try{
        //get token from header
        const authHeader=req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')){
            return next(
                new app_error(
                    'Access Denied. No Token Provided',
                    401,
                    'NO_TOKEN_PROVIDED'
                )
            ) 
        };

        const token=authHeader.split(' ')[1];
        //verify token
        const decoded=verifyToken(token);
        
        //get fresh user data from db
        const result=await pool.query(
            'SELECT user_id,username,email,role FROM Users WHERE user_id=$1', [decoded.user_id]
        )
        
        if (result.rows.length==0){

            return next(
                new app_error(
                    'User Not Found',
                    401,
                    'USER_NOT_FOUND'
                )
            );

        }

        //attach user to request
        req.user=result.rows[0];
        next();
        
    } catch (error){
        if(error.name==='JsonWebTokenError'){
            return next(
                new app_error(
                'Invalid Token ',
                401,
                'INVALID_TOKEN'
            ));
        }
        if(error.name==='TokenExpiredError'){
            return next(
                new app_error(
                    'Token has Expired',
                    401,
                    'TOKEN_EXPIRED'
                )
            )
        }
        console.error('Auth middleware error:',error);
        return res.status(500).json({
            success:false,
            error:{
                code:'AUTH_ERROR',
                message:'Authentication error.'
            }
        });
    }
    
};

const requireAdmin=(req,res,next)=>{
    if(req.user.role !=='admin'){

        return next(
            new app_error(
                'Admin Access Required',
                403,
                'FORBIDDEN'
            )
        )
    }
};


//optional auth
const optionalAuth =async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(authHeader &&authHeader.startsWith('Bearer')){
            const token=authHeader.split(' ')[1];
            const decoded=verifyToken(token);

            const result=await pool.query(
                'SELECT user_id, username,email,role FROM Users WHERE user_id=$1',
                [decoded.user_id]
            );
            if(result.rows.length>0){
                req.user=result.rows[0];
            }
        }
        next();

    } catch (error) {
        //continue without user if token invalid
        next();
    }
};
module.exports={
    authenticate,
    requireAdmin,
    optionalAuth
};