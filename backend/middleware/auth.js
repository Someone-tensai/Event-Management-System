const{verifyToken}=require('../utils/jwt');

const pool =require('../db/pool');

//middleware to authenticate user to verify token and attach to rquest

const authenticate=async(req,res,next)=>{
    try{
        //get token from header
        const authHeader=req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                success:false,
                error: {
                    code: 'No_token_provided',
                    message:'Access Denied. No token provided.'
                }
            });
        }

        const token=authHeader.split(' ')[1];
        //verify token
        const decoded=verifyToken(token);
        
        //get fresh user data from db
        const result=await pool.query(
            'SELECT user_id,username,email,role FROM Users WHERE user_id=$1', [decoded.user_id]
        )
        
        if (result.rows.length==0){
            return res.status(401).json({
                success:false,
                error:{
                    code:'User not found',
                    message:'User no longer exists.'
                }

            });
        }

        //attach user to request
        req.user=result.rows[0];
        next();
        
    } catch (error){
        if(error.name==='JsonWebTokenError'){
            return res.status(401).json({
                success:false,
                error:{
                    code:'INVALID_TOKEN',
                    message:'Invalid token '
                }
            });
        }
        if(error.name==='TokenExpiredError'){
            return res.status(401).json({
                success:false,
                error:{
                    code:'TOKEN_EXPIRED',
                    message:'Token has expired.'
                }

            });
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
        return res.status(403).json({
            success:false,
            error:{
                code:'FORBIDDEN',
                message:'Admin access required.'
            }
        });
    }
    next();
};


//optional auth
const optionalAuth =async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(authHeader &&authHeader.startsWith('Bearer')){
            const token=authHeader.split('')[1];
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