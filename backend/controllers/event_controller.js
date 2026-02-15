const {query_all_events, query_event_with_id, query_create_new_event, query_edit_event, query_delete_event} = require("../db/event_queries");
const app_error =  require("../errors/app_error");
async function get_all_events(req,res,next)
{
    try{
    const {sort_by, type} = req.query;
    console.log(type);
    if(sort_by && !['date','price'].includes(sort_by))
    {
        next(new app_error(
            'Invalid sort_by Value',
            400,
            'INVALID_QUERY_PARAM', 
            true
        ));
        return;
    }
    const events = await query_all_events(sort_by, type);
    const formatted = events.map(event => {
    const dateObj = new Date(event.date_time);

    return {
      id: event.event_id,
      title: event.title,
      date: dateObj.toISOString().split("T")[0],
      time: dateObj.toISOString().split("T")[1].slice(0,5),
      type: event.category?.toLowerCase() || "physical",
      priority: false, // or logic if you have one
      price: event.price,
      venue: event.venue,
      image: "/default-event.jpg", // temporary until you store real images
      totalSeats: event.total_seats,
      availableSeats: event.total_seats, // replace with real calculation later
      club: {
        name: event.club_name,
        logo: "/default-club.png"
      }
    };
  });
    res.json(formatted);
    }
    catch(err)
    {
        if(err.code === "22P02")
        {
            next(new app_error(
                'Invalid Query Parameter Format',
                400,
                'INVALID_INPUT',
                true,
                err.message
            ));
        }
        throw err;
    }
    
}

async function get_event_with_id(req, res, next)
{
   
    try{
    const id = req.params.event_id;
    const event = await query_event_with_id(id);
    if(event.length === 0) throw new app_error(
            'Event not Found',
            404,
            'EVENT_NOT_FOUND'
        );
    res.json({event});
    }

    catch(err)
    {
        if(err.code === '22P02')
        {
            next(new app_error(
                'Event ID must be a number',
                400,
                'INVALID_EVENT_ID'
            ));
        }

        next(new app_error(
            'Database Fetch Failed',
            500,
            'DB_FETCH_FAILED'
        ));
        
    }
   
}

async function create_new_event(req, res)
{
    try{
    const {club_id, title, description, date_time, venue, total_seats, price, category, due_date} = req.body;
    await query_create_new_event(club_id, title,date_time, venue, total_seats, price,due_date, category, description);
    res.json(("Response: Event Added"));
    }
    catch(err)
    {
        if(err.code === '23503')
        {
        next(new app_error(
                'Invalid Club ID',
                400,
                'INVALID_CLUB_ID'
            )
        )
    }
        throw err;
    }
}

async function edit_event(req, res)
{
    try{
        const {event_id, title, description, date_time, venue, total_seats, price, category, due_date} = req.body;
        await query_edit_event(event_id, title, description, date_time, venue, total_seats, price, category, due_date);
        res.json(("Response: Event Edited"));
    }
    catch(err) {
        throw err;
    }
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
    create_new_event, 
    edit_event,
    delete_event
};