// Routes for the Bookings
const {Router} = require("express");
const {get_all_bookings, get_booking_with_id, add_new_booking} = require("../controllers/booking_controller")

const bookings_router = Router();

bookings_router.get("/",get_all_bookings);
bookings_router.get("/:booking_id", get_booking_with_id);

bookings_router.post("/", add_new_booking);
// bookings_router.post("/");

module.exports = bookings_router;
