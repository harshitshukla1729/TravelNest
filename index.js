const express = require("express");
const app = express();

const PORT = 8080;
const MONGO_URL = "mongodb://localhost:27017/TravelNest";

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");

// const Listing = require("./models/listing");

const listingRouter = require("./routes/listing");
const userRouter = require("./routes/user");

const ExpressError = require("./utils/ExpressError");

mongoose.connect(MONGO_URL)
    .then(() => console.log("MONGODB Connected"))
    .catch((err) => console.log("Error in Connecting to MONGODB", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.engine("ejs", ejsMate);

const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 & 1000,
        maxAge: 7 * 24 * 60 * 60 & 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middlewares
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})


// Routes

app.get("/", (req, res) => {
    res.send("Hi from Root");
});

app.use("/listings", listingRouter);
app.use("/users",userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", {
        message,
    });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));