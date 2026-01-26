// Routes for the Events
const {Router} = require("express");
const {get_all_events, get_event_with_id, add_new_event, edit_event, delete_event} = require("../controllers/event_controller")
const {is_logged_in, is_eligible_to_create} = require("../controllers/auth_controller")
const events_router = Router();

events_router.get("/" , get_all_events);
events_router.get("/:event_id", get_event_with_id);

events_router.post("/add", is_logged_in,is_eligible_to_create, add_new_event);
events_router.put("/:event_id", edit_event);

events_router.delete("/:event_id", delete_event);
module.exports = events_router;