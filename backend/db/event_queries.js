const pool = require("./pool.js");
async function query_all_events(sort_by='date',type='') {

    
    let query = `
        SELECT Events.*, Clubs.* FROM Events 
        JOIN Clubs ON
        Clubs.club_id = Events.club_id
        WHERE 1=1
        `;
    let params = [];
    let i = 0;
    if(type != '') 
    {
        query += ` AND Events.category = $${i+1}`;
        params[i++] = type;
    }

    if(sort_by=='date') 
    {
        query+=' ORDER BY Events.event_date';
    }
    else if(sort_by == 'price')
    {
        query += ' ORDER BY price DESC ';
    }
    try{
   
    const { rows } = await pool.query(query, params);
    return rows;
}
    
    catch(err) {
        throw err;
    }
}
   

async function query_event_with_id(id)
{
    try{
    const {rows} = await pool.query(
        `
        SELECT Events.* , Clubs.* FROM Events
        JOIN Clubs ON
        Clubs.club_id = Events.club_id 
        WHERE event_id = $1
        `, [id]
    );
    return rows[0];
    }
    catch(err)
    {
        throw err;
    }
    
}

async function query_create_new_event(club_id, title, description, date, time, venue, total_seats, price, type, due_date, category='' , refund_policy, agenda, banner_url)
{
    try{
    const result = await pool.query(
        `
        INSERT INTO Events (club_id, title, description,event_date, time, venue, total_seats, available_seats, price, category, due_date, refund_policy, agenda, type, banner)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $8, $9, $10, $11, $12, $13, $14)
        `, [club_id, title, description, date, time, venue, total_seats, price, category, due_date, refund_policy, agenda, type, banner_url]
    )
}
    catch(err){
        throw err;
    }
}

async function query_edit_event(event_id, title, description, date_time, venue, total_seats, price, category, due_date)
{
    try {
        const result = await pool.query(
            `
            UPDATE Events 
            SET title = $1 , description = $2, date_time = $3, venue = $4 , total_seats = $5, price = $6 , category = $7 , due_date = $8
            WHERE event_id = $9
            `,
            [title, description, date_time, venue, total_seats, price, category, due_date, event_id]
        )
    }
    catch(err) {
        throw err;
    }
}

async function query_delete_event(id)
{
    try{
    const result = pool.query(
        `
        DELETE FROM Events WHERE event_id = $1
        `, [id]
    );
}   
    catch(err)
    {
        throw err;
    }
}
module.exports = {
    query_all_events,
    query_event_with_id,
    query_create_new_event,
    query_edit_event,
    query_delete_event
};