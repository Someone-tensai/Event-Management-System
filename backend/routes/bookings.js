// Routes for the Bookings
const { Router } = require("express");
const {
  get_booking_of_user_for_event,
  get_all_bookings,
  get_booking_with_id,
  add_new_booking,
  get_bookings_for_user,
} = require("../controllers/booking_controller");
const { is_logged_in } = require("../middleware/auth_controller");
const bookings_router = Router();

bookings_router.get("/", get_all_bookings);
bookings_router.get("/user", is_logged_in, get_booking_of_user_for_event);
bookings_router.get("/all", is_logged_in, get_bookings_for_user);
bookings_router.get("/:booking_id", is_logged_in, get_booking_with_id);
bookings_router.post("/add", is_logged_in, add_new_booking);
// bookings_router.post("/");

module.exports = bookings_router;
