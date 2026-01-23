const {Router} = require("express");
const {register_user_data, login_user, get_all_users} = require("../controllers/user_controller");
const {require_admin} = require("../middleware/auth")
const user_router = Router();

user_router.post("/register", register_user_data);
user_router.post("/login", login_user);
user_router.get("/", get_all_users);

module.exports = user_router;