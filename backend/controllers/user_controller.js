const {query_register_user, query_find_by_username, query_get_all_users} = require("../db/user_queries")
const {hash_password, compare_password} = require("../utils/hash")
const {app_error} = require("../errors/app_error")

async function register_user_data(req, res)
{
    try{
    const {username, email, password} = req.body;
    const user_data = [username, email, await hash_password(password), ''];
    console.log(user_data);
    await query_register_user(user_data);
    res.status(200).json({
        success: true,
        message: 'Registered Successfully'
    });
    }
    catch(err)
    {
        throw err;
    }
}

async function login_user(req, res)
{
    const {username , password} = req.body;
    const user_data = await query_find_by_username(username);
    let hash = user_data.password;
    let is_correct_password = compare_password(password, hash);
    if(is_correct_password) {
        res.status(200).json({
            success:true,
            message: "Login Successful"
        })
    }
    else {
        next(
            new app_error(
                'Wrong Password',
                400,
                'WRONG_PASSWORD'
            )
        )
    }
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
    get_all_users
}