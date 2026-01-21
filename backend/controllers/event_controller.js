const {query_all_events, query_event_with_id, query_add_new_event, query_edit_event, query_delete_event} = require("../db/event_queries");

async function get_all_events(req,res)
{
    const {sort_by, date,due_date, category} = req.query;
    const events = await query_all_events(sort_by, date, due_date, category);
    res.json({events});
}

async function get_event_with_id(req, res)
{
    const id = req.params.event_id;
    const event = await query_event_with_id(id);
    res.json({event});
}

async function add_new_event(req, res)
{
    const {club_id, title, description, date_time, venue, total_seats, price, category} = req.body;
    await query_add_new_event(club_id, title,date_time, venue, total_seats, price, category, description);
    res.json(("Response: Event Added"));
}

async function edit_event()
{

}

async function delete_event(req, res)
{
    const id = req.params.event_id;
    query_delete_event(id);
    res.json("Message: Event Deleted");
}
module.exports = {
    get_all_events,
    get_event_with_id,
    add_new_event, 
    edit_event,
    delete_event
};