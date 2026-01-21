const pool = require("./pool.js");

async function query_all_bookings()
{
    const {rows} = await pool.query(
        `
        SELECT * FROM Bookings
        `
    );
    return rows;
}

async function query_booking_with_id(id)
{
    const {rows} = await pool.query(
        `
        SELECT * FROM Bookings WHERE booking_id = $1
        `, [id]
    );
    return rows[0];
}

async function query_add_new_booking(booking_array)
{
    const results = await pool.query(
        `
        INSERT INTO Bookings (user_id, event_id, tickets_booked, status)
        VALUES ($1, $2, $3, $4)
        `,booking_array
    );
}
module.exports = {
    query_all_bookings,
    query_booking_with_id,
    query_add_new_booking
};