const express = require("express");
const app = express();

const PORT = 8080;
const MONGO_URL = "mongodb://localhost:27017/TravelNest";

const mongoose = require("mongoose");
const path = require("path");

const Listing = require("./models/listing");

mongoose.connect(MONGO_URL)
.then(()=>console.log("MONGODB Connected"))
.catch((err) => console.log("Error in Connecting to MONGODB",err));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

// Middlewares


// Routes

app.get("/",(req,res) => {
    res.send("Hi from Root");
});

app.listen(PORT,() => console.log(`Server Started at PORT:${PORT}`));