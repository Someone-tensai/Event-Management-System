const pool = require("./pool.js");
const app_error = require("../errors/app_error.js")
async function query_get_all_clubs()
{
    try{
    const {rows} = await pool.query(
        `
        SELECT * FROM Clubs
        `
    )
    return rows;
}
    catch(err)
    {
      throw err;
    }
}


async function query_add_new_club(club_name, creator_id) {
    try {
        const result = await pool.query(
            `
            INSERT INTO Clubs (club_name, creator_id)
            VALUES ($1, $2)
            `,
            [club_name, creator_id]
        );
        return;
    }
    catch(err)
    {
      throw err;
    }
}

async function query_user_club(user_id) {
    try {
        const {rows} = await  pool.query(
            `
            SELECT club_id FROM UserClub WHERE user_id = $1
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
    console.log("1");
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
module.exports = {
    query_get_all_clubs,
    query_add_new_club,
    query_user_club,
    query_club_creator_check,
    query_number_of_people,
    query_join_a_club
}