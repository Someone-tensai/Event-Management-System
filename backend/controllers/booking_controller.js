const {query_all_bookings, query_booking_with_id, query_add_new_booking} = require("../db/booking_queries");
async function get_all_bookings(req,res)
{
    const bookings = await query_all_bookings();
    res.json({bookings});
}

async function get_booking_with_id(req,res)
{
    const id = req.params.booking_id;
    const booking = await query_booking_with_id(id);
    res.json({booking});
}

async function add_new_booking(req, res)
{
    const {user_id, event_id, tickets_booked} = req.body;
    let booking_array = [user_id, event_id, tickets_booked, 'Pending'];
    await query_add_new_booking(booking_array);
    res.json("Message: Booking Added");

}
module.exports = {
    get_all_bookings,
    get_booking_with_id,
    add_new_booking
};