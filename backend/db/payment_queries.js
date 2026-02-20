const pool = require("./pool.js");

async function query_get_all_payments(club_id) {
  try {
    const { rows } = await pool.query(
      `
        SELECT e.title, b.booking_time , u.username, u.email,p.payment_id, p.payment_proof, p.amount, p.payment_status FROM Events e
        JOIN Bookings b ON 
        e.event_id = b.event_id
        JOIN Users u on
        b.user_id = u.user_id
        JOIN Payments p ON 
        p.booking_id = b.booking_id
        WHERE e.club_id = $1;
            `,
      [club_id],
    );
    return rows;
  } catch (err) {
    throw err;
  }
}
async function query_insert_payment(booking_id, amount, payment_proof) {
  try {
    const { rows } = await pool.query(
      `
            INSERT INTO Payments (booking_id, amount , payment_proof)
            VALUES ($1, $2, $3)
            `,
      [booking_id, amount, payment_proof],
    );
  } catch (err) {
    throw err;
  }
}

async function query_change_payment_status(payment_id, status) {
  try {
    const { rows } = await pool.query(
      `
            UPDATE Payments SET payment_status = $1 
            WHERE payment_id = $2
            `,
      [status, payment_id],
    );
    const result = await pool.query(
      `
        SELECT booking_id FROM Payments WHERE payment_id = $1
        `,
      [payment_id],
    );
    const booking = result.rows[0].booking_id;
    return booking;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  query_get_all_payments,
  query_insert_payment,
  query_change_payment_status,
};
