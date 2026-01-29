const pool = require("./pool.js");
const app_error = require("../errors/app_error.js")
async function query_get_all_clubs()
{
    try{
    const {rows} = await pool.query(
        `
        SELECT * FROM Clubs;
        `
        // `
        // SELECT creator_id, ARRAY_AGG(club_name) AS Clubs FROM Clubs GROUP BY creator_id
        // `
    )
    return rows;
}
    catch(err)
    {
      throw err;
    }
}

async function query_clubid_by_name(club_name) {
    try{
        const {rows} = await pool.query(
            
            `
            SELECT club_id FROM Clubs WHERE club_name = $1
            `, [club_name]
        );
        return rows[0];
    }
    catch(err)
    {
        throw err;
    }
}

async function query_create_new_club(club_name, creator_id, invite_only) {
    try {
        const result = await pool.query(
            `
            INSERT INTO Clubs (club_name, creator_id, invite_only)
            VALUES ($1, $2, $3)
            `,
            [club_name, creator_id, invite_only]
        );
        return result;
    }
    catch(err)
    {
      throw err;
    }
}

// Query to check if a user has created a club already
async function query_user_created_club(user_id) {
    try {
        const {rows} = await  pool.query(
            `
            SELECT club_id FROM Clubs WHERE creator_id = $1
            `,[user_id] 
        )
        return rows;
    }
    catch(err)
    {
        throw err;
    }
}

async function query_club_creator_check(user_id, club_id) {
    try {
        const {rows} = await pool.query(
            `
            SELECT * FROM Clubs WHERE club_id = $1 AND creator_id = $2
            `, [club_id, user_id]
        )
        return rows;
    }
    catch(err)
    {
        throw err;
    }
}

async function query_number_of_people(club_id) {
    try {
        const {rows} = await pool.query(
            `
            SELECT COUNT(user_id) AS num FROM UserClub GROUP BY $1
            `,[club_id]
        );
        return rows;
    }
    catch(err)
    {
        throw err;
    }
}

async function query_join_a_club(user_id , club_id)
{
    try {
        const result = await pool.query(
            `
            INSERT INTO UserClub (user_id, club_id)
            VALUES($1, $2)
            `,[user_id, club_id]
        );
    }
    catch(err)
    {
        throw err;
    }
}

async function query_club_invite(user_id, club_id)
{
    try {
        const result = await pool.query(
            `
            INSERT INTO Invites (user_id, club_id)
            VALUES($1, $2)
            `,[user_id, club_id]
        );
    }
    catch(err)
    {
        throw err;
    }
}

async function query_invite_only(club_id)
{
    try{
        const {rows} = await pool.query(
            `
            SELECT invite_only FROM Clubs WHERE club_id = $1
            `, [club_id]
        )
        return rows;
    }
    catch(err)
    {
        throw err;
    }
}

async function query_user_was_invited(user_id, club_id) {
    try{
        const {rows} = await pool.query(
            `
            SELECT * FROM Invites WHERE user_id = $1 AND club_id = $2 
            `, [user_id, club_id]
        );
        return rows;
    }
    catch{

    }
}

async function query_user_in_club(user_id, club_id) {

    try{
        const {rows} = await pool.query(
            `
            SELECT * FROM UserClub WHERE user_id = $1 AND club_id = $2
            `, [user_id, club_id]
        );
        return rows;
    }       
    catch(err)
    {
        throw err;
    }
}

async function query_leave_club(user_id, club_id) {
    try{
        const {rows} = await pool.query(
            `
            DELETE FROM UserClub WHERE user_id = $1 AND club_id = $2
            `, [user_id, club_id]
        );
    }
    catch(err)
    {
        throw err;
    }
}

async function query_disable_invite(user_id , club_id) {
    try{
        const {rows} = await pool.query(
            `
            DELETE FROM Invites WHERE user_id = $1 AND club_id = $2 
            `, [user_id, club_id]
        );
    }
    catch(err){
        throw err;
    }
}
module.exports = {
    query_get_all_clubs,
    query_create_new_club,
    query_user_created_club,
    query_club_creator_check,
    query_number_of_people,
    query_join_a_club,
    query_clubid_by_name,
    query_club_invite,
    query_invite_only,
    query_user_was_invited,
    query_user_in_club,
    query_leave_club,
    query_disable_invite
}