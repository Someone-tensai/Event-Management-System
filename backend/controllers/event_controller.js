const query_all_events = require("../db/event_queries");

async function get_all_events(req,res)
{
    const events = await query_all_events();
    res.json({events});
}

module.exports = get_all_events;