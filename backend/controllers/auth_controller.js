const app_error = require("../errors/app_error")
const config =require('../config/config');
const {verify_token} = require("../utils/jwt")
const {query_user_club, query_user_in_club, query_club_creator_check, query_number_of_people} = require("../db/club_queries");


async function is_logged_in(req, res, next)
{
    const token = req.cookies.token;
    if(!token)
    {
        next(
            new app_error(
                'No token Provided',
                401,
                'USER_NOT_LOGGED_IN'
            )
        );
    }
        try {
            req.user = verify_token(token, config.jwt.secret);
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


async function is_eligible_to_create(req, res, next)
{
    const user_id = req.user.user_id;
    // 1. In a Club
    const rows = await query_user_club(user_id);
    if(!rows || rows.length === 0) {
        next(new app_error(
            'User Not in a Club',
            403,
            'CLUB_NOT_JOINED'
        ));
    }

    // 2. Creator
    const club_id = rows[0].club_id;
    const creator = await query_club_creator_check(user_id, club_id);
    if(creator.length === 0)
    {
        next(new app_error(
            'User is not the creator of the Club',
            403,
            'NOT_CLUB_CREATOR'
        ));
    }

    // 3. Members Count
    const club_members = await query_number_of_people(club_id);

    next();

}

async function is_from_club(req, res, next) {
    
    const user_id = req.user.user_id;
    const {club_id} = req.body;
    const user_in_club = await query_user_in_club(user_id, club_id);
    if(user_in_club.length === 0) next(
        new app_error(
            'Must be Club Member to invite others',
            403,
            'NOT_CLUB_MEMBER'
        )
    );
      
    next();
}
module.exports = {
    is_logged_in,
    is_eligible_to_create,
    is_from_club
};