const { Router } = require("express");
const {
  get_all_payments,
  insert_payment,
  verify_payment,
  reject_payment,
} = require("../controllers/payment_controller");
const {
  is_logged_in,
  is_club_creator,
  is_eligible_to_create,
} = require("../middleware/auth_controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const payment_router = Router();

payment_router.get("/", get_all_payments);
payment_router.post(
  "/pay",
  is_logged_in,
  upload.fields([{ name: "payment_proof", maxCount: 1 }]),
  insert_payment,
);
payment_router.post(
  "/verify",
  is_logged_in,
  is_eligible_to_create,
  verify_payment,
);
payment_router.post(
  "/reject",
  is_logged_in,
  is_eligible_to_create,
  reject_payment,
);

module.exports = payment_router;
