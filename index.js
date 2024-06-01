const express = require("express");
const app = express();

const PORT = 8080;
const MONGO_URL = "mongodb://localhost:27017/TravelNest";

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Listing = require("./models/listing");

const listingRouter = require("./routes/listing");

mongoose.connect(MONGO_URL)
    .then(() => console.log("MONGODB Connected"))
    .catch((err) => console.log("Error in Connecting to MONGODB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.engine("ejs",ejsMate);

// Middlewares
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));


// Routes

app.get("/", (req, res) => {
    res.send("Hi from Root");
});

app.use("/listings", listingRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));