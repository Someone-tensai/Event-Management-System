const {Router} = require("express");
const {insert_payment, verify_payment} = require("../controllers/payment_controller")
const {is_logged_in, is_club_creator} = require("../middleware/auth_controller")
const payment_router = Router();

payment_router.post("/book", is_logged_in, insert_payment);
payment_router.post("/verify", is_logged_in, is_club_creator, verify_payment);