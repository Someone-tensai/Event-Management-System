const {Router} = require("express");
const {get_event_of_clubs, get_all_clubs , get_club_details, club_invite, create_new_club, join_a_club, leave_club} = require("../controllers/club_controller")
const {is_logged_in, is_from_club} = require("../middleware/auth_controller")
const multer = require("multer");
const club_router = Router();
const upload = multer({storage: multer.memoryStorage()});

club_router.get("/", get_all_clubs);

club_router.post("/create",  is_logged_in, upload.fields([
    {name: 'logo', maxCount:1},
    {name: 'cover_image', maxCount: 1},
]), create_new_club);
club_router.post("/join", is_logged_in, join_a_club);
club_router.post("/invite" , is_logged_in, is_from_club, club_invite);
club_router.post("/leave", is_logged_in, is_from_club, leave_club);
club_router.get("/events/:club_id",is_logged_in, get_event_of_clubs);
club_router.get("/:club_id",get_club_details);

module.exports = club_router;