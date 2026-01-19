const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());
const events_router = require("./routes/events");

app.use("/api/events", events_router);

const PORT = 3000;
app.listen(PORT, (error)=>{
    if(error)  throw error;
    console.log(`First Express App - Listening on port ${PORT}`);
});