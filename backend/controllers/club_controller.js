const {query_get_all_clubs , query_add_new_club, query_join_a_club} = require("../db/club_queries")
async function get_all_clubs(req, res, next)
{
    try{
    const rows = await query_get_all_clubs();
    res.json(rows);
    }

    catch(err)
    {
        next(err);
    }
    return;
}


async function add_new_club(req, res, next)
{
    try{
        const creator_id = req.user.user_id;
        const {club_name} = req.body;
        const result = await query_add_new_club(club_name, creator_id);
        res.json(("Message: Club Created"));
    }
    catch(err)
    {
        next(err);
    }
}

async function join_a_club(req, res, next)
{
    try {
        const user_id = req.user.user_id;
        const {club_id} = req.body;
        await query_join_a_club(user_id, club_id);
        res.json(("Message: Club Joined Succesfully"));
    }
    catch(err)
    {
        next(err);
    }
}
module.exports = {
    get_all_clubs,
    add_new_club,
    join_a_club
}