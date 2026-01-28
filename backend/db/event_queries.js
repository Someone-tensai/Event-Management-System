const pool = require("./pool.js");
async function query_all_events(sort_by='newest', event_date='', due_date_before = '',category='') {

    
    let query = `
        SELECT Events.*, Clubs.club_name,  TO_CHAR(Events.date_time AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS event_date FROM Events 
        JOIN Clubs ON
        Clubs.club_id = Events.club_id
        WHERE 1=1
        `;
    let params = [];
    let i = 0;
    if(category != '') 
    {
        query += ` AND Events.category = $${i+1}`;
        params[i++] = category;
    }

    if(event_date != '')
    {
        query += ` AND Events.date_time::date = $${i+1}`;
        params[i++] = event_date;
    }
    if(due_date_before != '')
    {
        query += ` AND Events.due_date <= $${i+1}`;
        params[i++] = due_date_before;
    }
    if(sort_by=='newest') 
    {
        query+=' ORDER BY Events.date_time DESC';
    }
    else query += ' ORDER BY Events.date_time ASC';
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
        SELECT * FROM Events WHERE event_id = $1
        `, [id]
    );
    return rows[0];
    }
    catch(err)
    {
        throw err;
    }
    
}

async function query_create_new_event(club_id, title, date_time, venue, total_seats, price, due_date, category='' , description='')
{
    try{
    const result = await pool.query(
        `
        INSERT INTO Events (club_id, title, description, date_time, venue, total_seats, price, category, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [club_id, title, description, date_time, venue, total_seats, price, category, due_date]
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