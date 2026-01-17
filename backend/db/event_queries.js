const pool = require("./pool.js");
async function query_all_events() {
    const { rows } = await pool.query(
        `
        SELECT * FROM Events
        ORDER BY date_time;
        `
    )
    return rows;
}

module.exports = query_all_events;