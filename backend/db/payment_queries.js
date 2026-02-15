const pool = require("./pool.js");

async function query_insert_payment(booking_id) {
    try {
        const {rows} = await pool.query(
            `
            INSERT INTO Payments (booking_id, payment_status)
            VALUES ($1, 'Pending')
            `,
            [booking_id]
        )
    }
    catch(err)
    {
        throw err;
    }
}

async function query_verify_payment(booking_id) {
    try {
        const {rows} = await pool.query(
            `
            UPDATE Payments SET payment_status = 'Verified' 
            WHERE booking_id = $1
            `,
            [booking_id]
        );
    }

    catch(err)
    {
        throw err;
    }
}
module.exports = {
    query_insert_payment,
    query_verify_payment
}