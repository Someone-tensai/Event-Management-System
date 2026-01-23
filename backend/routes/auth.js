const app_error = require("../errors/app_error")
const config =require('../config/config');

function auth(req, res, next)
{
    const token = req.cookies.token;

    if(!token)
    {
        next(
            new app_error(
                'No token Provided',
                401,
                'TOKEN_NOT_PROVIDED'
            )
        );
        
        try {
            req.user = jwt.verify(token, config.jwt.secret);
            next();
        }
        catch(err)
        {
            next(
                new app_error(
                    err.message,
                    401,
                    'INVALID_TOKEN'
                )
            );
        }
    }
}