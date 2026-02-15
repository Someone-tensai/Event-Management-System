const {Router} = require("express");
const {register_user_data, login_user, get_all_users, logout_user, send_user_data} = require("../controllers/user_controller");
const {is_logged_in, require_admin} = require("../middleware/auth_controller");
const { user } = require("pg/lib/defaults");
const user_router = Router();

user_router.post("/register", register_user_data);
user_router.post("/login", login_user);
user_router.get("/",  get_all_users);
user_router.get("/logout", is_logged_in, logout_user);
user_router.get("/me", is_logged_in, send_user_data);
// is_logged_in, require_admin,
module.exports = user_router;