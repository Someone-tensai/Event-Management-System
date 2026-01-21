const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const events_router = require("./routes/events");
const bookings_router = require("./routes/bookings");

app.use("/api/events", events_router);
app.use("/api/bookings", bookings_router);

const PORT = 3000;
app.listen(PORT, (error)=>{
    if(error)  throw error;
    console.log(`First Express App - Listening on port ${PORT}`);
});