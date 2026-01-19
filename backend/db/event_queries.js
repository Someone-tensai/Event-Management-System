const pool = require("./pool.js");
async function query_all_events(sort_by='newest', event_date='', due_date_before = '',category='') {

    let query = `
        SELECT * FROM Events WHERE 1=1
        `;
    let params = [];
    let i = 0;
    if(category != '') 
    {
        query += ` AND category = $${i+1}`;
        params[i++] = category;
    }

    if(event_date != '')
    {
        query += ` AND date_time::date = $${i+1}`;
        params[i++] = event_date;
    }
    if(due_date_before != '')
    {
        query += ` AND due_date <= $${i+1}`;
        params[i++] = due_date_before;
    }
    if(sort_by=='newest') 
    {
        query+=' ORDER BY date_time DESC';
    }
    else query += ' ORDER BY date_time ASC';
    const { rows } = await pool.query(query, params);
    return rows;
}

async function query_event_with_id(id)
{
    const {rows} = await pool.query(
        `
        SELECT * FROM Events WHERE event_id = $1
        `, [id]
    );
    return rows[0];
}

async function query_add_new_event(club_id, title, date_time, venue, total_seats, price, category='' , description='')
{
    const result = await pool.query(
        `
        INSERT INTO Events (club_id, title, description, date_time, venue, total_seats, price, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [club_id, title, description, date_time, venue, total_seats, price, category]
    )
}

async function query_edit_event(id)
{

}

async function query_delete_event(id)
{
    const result = pool.query(
        `
        DELETE FROM Events WHERE event_id = $1
        `, [id]
    );
}
module.exports = {
    query_all_events,
    query_event_with_id,
    query_add_new_event,
    query_edit_event,
    query_delete_event
};