// Routes for the Events
const { Router } = require("express");
const {
  get_all_events,
  get_event_with_id,
  create_new_event,
  edit_event,
  delete_event,
} = require("../controllers/event_controller");
const {
  is_logged_in,
  is_eligible_to_create,
  is_club_creator,
} = require("../middleware/auth_controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const events_router = Router();

events_router.get("/", get_all_events);

events_router.get("/:event_id", is_logged_in, get_event_with_id);

events_router.post(
  "/create",
  is_logged_in,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "qr_code", maxCount: 1 },
  ]),
  is_eligible_to_create,
  create_new_event,
);
events_router.put(
  "/:event_id",
  is_logged_in,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "qr_code", maxCount: 1 },
  ]),
  is_eligible_to_create,
  edit_event,
);

events_router.delete(
  "/:event_id",
  is_logged_in,
  is_eligible_to_create,
  delete_event,
);
module.exports = events_router;
