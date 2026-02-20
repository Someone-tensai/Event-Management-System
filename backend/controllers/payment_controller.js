const {
  query_get_all_payments,
  query_insert_payment,
  query_change_payment_status,
} = require("../db/payment_queries");

const { query_verify_booking } = require("../db/booking_queries");

const { supabase } = require("../db/supabaseClient");

const App_Error = require("../errors/app_error");

async function get_all_payments(req, res, next) {
  const { club_id } = req.query;
  try {
    const payments = await query_get_all_payments(club_id);
    res.json(payments);
  } catch (err) {
    throw err;
  }
}
async function insert_payment(req, res, next) {
  try {
    const { booking_id, amount } = req.body;

    if (!booking_id || !amount)
      next(new App_Error("Incomplete Parameters", 400, "INVALID_FIELD_PARAMS"));
    const payment_file = req.files?.["payment_proof"]?.[0];
    if (!payment_file) {
      return res.status(400).json({ error: "Payment Proof is Required" });
    }
    const { data: payment_data, error: payment_error } = await supabase.storage
      .from("Assets") // <-- bucket name here
      .upload(
        `banners/${Date.now()}-${payment_file.originalname}`,
        payment_file.buffer,
      );

    if (payment_error) throw payment_error;

    const payment_proof_url = supabase.storage
      .from("Assets")
      .getPublicUrl(payment_data.path).data.publicUrl;

    await query_insert_payment(booking_id, amount, payment_proof_url);

    res.json("Message : Payment Successful(Not Verified)");
  } catch (err) {
    next(err);
  }
}

async function verify_payment(req, res, next) {
  try {
    const { payment_id } = req.body;
    const booking_id = await query_change_payment_status(
      payment_id,
      "verified",
    );
    await query_verify_booking(booking_id, "verified");
    res.json("Message : Payment Verified");
  } catch (err) {
    next(err);
  }
}

async function reject_payment(req, res, next) {
  try {
    const { payment_id } = req.body;
    const booking_id = await query_change_payment_status(
      payment_id,
      "rejected",
    );
    await query_verify_booking(booking_id, "rejected");
    res.json("Message : Payment Rejected");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  get_all_payments,
  insert_payment,
  verify_payment,
  reject_payment,
};
