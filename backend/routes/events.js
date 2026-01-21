// Routes for the Events
const {Router} = require("express");
const get_all_events = require("../controllers/event_controller")

const events_router = Router();

events_router.get("/" , get_all_events);

module.exports = events_router;