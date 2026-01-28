const {Router} = require("express");
const {get_all_clubs ,club_invite, create_new_club, join_a_club} = require("../controllers/club_controller")
const {is_logged_in, is_from_club} = require("../controllers/auth_controller")
const club_router = Router();

club_router.get("/", get_all_clubs);

club_router.post("/create",  is_logged_in, create_new_club);
club_router.post("/join", is_logged_in, join_a_club);
club_router.post("/invite" , is_logged_in, is_from_club, club_invite);
module.exports = club_router;