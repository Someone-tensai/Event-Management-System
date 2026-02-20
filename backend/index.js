const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const app_error = require("./errors/app_error");
const events_router = require("./routes/events");
const bookings_router = require("./routes/bookings");
const user_router = require("./routes/users");
const club_router = require("./routes/club");
const payment_router = require("./routes/payments");
const app = express();

dotenv.config();
const allowed_origin =
  "event-management-system-git-main-someone-tensais-projects.vercel.app";
app.use(
  cors({
    origin: allowed_origin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookie_parser());

app.use("/api/events", events_router);
app.use("/api/bookings", bookings_router);
app.use("/api/users", user_router);
app.use("/api/clubs", club_router);
app.use("/api/payments", payment_router);
const PORT = 5000;
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`First Express App - Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof app_error) {
    return res.status(err.status_code).json({
      status: "error",
      message: err.message,
      error_code: err.error_code,
      details: err.details,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something Went Wrong",
    error_code: "INTERNAL_SERVER_ERROR",
  });
});
