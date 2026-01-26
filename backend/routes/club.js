const {Router} = require("express");
const {get_all_clubs , add_new_club, join_a_club} = require("../controllers/club_controller")
const {is_logged_in} = require("../controllers/auth_controller")
const club_router = Router();

club_router.get("/", get_all_clubs);

club_router.post("/add",  is_logged_in, add_new_club);
club_router.post("/join", is_logged_in, join_a_club);

module.exports = club_router;