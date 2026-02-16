const {
  query_get_user_booking_for_event,
  query_all_bookings,
  query_booking_with_id,
  query_add_new_booking,
} = require("../db/booking_queries");
const { query_event_with_id } = require("../db/event_queries");
async function get_all_bookings(req, res) {
  const bookings = await query_all_bookings();
  res.json({ bookings });
}

async function get_booking_with_id(req, res) {
  const id = req.params.booking_id;
  const booking = await query_booking_with_id(id);
  res.json({ booking });
}

async function get_booking_of_user_for_event(req, res) {
  const user_id  = req.user.user_id;
  const { event_id } = req.query;
  const booking = await query_get_user_booking_for_event(user_id, event_id);
  const event = await query_event_with_id(event_id);
  const dateObj = new Date(event.date_time);

  const formatted = {
    id: booking.booking_id,
    event_id: event.event_id,
    event_name: event.title,
    event_date: dateObj.toISOString().split("T")[0],
    venue: event.venue,
    tickets: booking.tickets_booked,
    status: booking.status,
    paymentProof: "",
    qrCode: "",
  };
  console.log(formatted);
  res.json(formatted);
}
async function add_new_booking(req, res) {
  try {
    const user_id = req.user.user_id;
    const { event_id, tickets_booked } = req.body;
    let booking_array = [user_id, event_id, tickets_booked, "Pending"];
    await query_add_new_booking(booking_array);
    res.status(200).json("Message: Booking Added");
  } catch (err) {
    throw err;
  }
}
module.exports = {
  get_all_bookings,
  get_booking_with_id,
  add_new_booking,
  get_booking_of_user_for_event,
};
