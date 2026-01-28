const {query_register_user, query_find_by_username, query_get_all_users} = require("../db/user_queries")
const {hash_password, compare_password} = require("../utils/hash")
const {generate_token} = require("../utils/jwt");
const app_error = require("../errors/app_error")

async function register_user_data(req, res, next)
{
    try{
    const {username, email, password} = req.body;
    if(!username || !email || !password)
    {
        next( new app_error(
            'Required fields not given',
            400,
            'INVALID_FIELD_DATA'
        ));
    }
    const user_data = [username, email, await hash_password(password), ''];
    await query_register_user(user_data);
    res.status(200).json({
        success: true,
        message: 'Registered Successfully'
    });
    }
    catch(err)
    {
        next(err);
    }
}

async function login_user(req, res, next)
{
    const {username , password} = req.body;
    if(!username || !password) 
    {
        next( new app_error(
            'No Username or Password',
            400,
            'USERNAME_OR_PASSWORD_NOT_GIVEN'
        ));
    }
    const user_data = await query_find_by_username(username);
    let hash = user_data.password;
    let is_correct_password = await compare_password(password, hash);
    if(is_correct_password) {
        const user = {
            user_id: user_data.user_id,
            email: user_data.email,
        }
        const token = generate_token(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite:'lax',
            secure: false,
            maxAge: 3600000
        });
        res.status(200).json({
            success:true,
            message: "Login Successful"
        })
    }
    else {
        next(
            new app_error(
                'Wrong Username or Password',
                400,
                'WRONG_USERNAME_OR_PASSWORD'
            )
        )
    }
}

function logout_user(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    });

    res.json({message: 'Logged Out'});
}
async function get_all_users(req, res)
{
    try {
        const data = await query_get_all_users();
        res.json({data});
        }
    catch(err)
    {
        throw err;
    }
}
module.exports = {
    register_user_data,
    login_user, 
    get_all_users,
    logout_user
}