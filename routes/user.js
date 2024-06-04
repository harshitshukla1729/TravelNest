const express = require("express");
const router = express.Router();

const User = require("../models/user");
const wrapAsync = require("../utils/warpAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);

        req.flash("success", "New User Registered!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/users/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/users/login", failureFlash: true }), wrapAsync(async (req, res) => {
    req.flash("success","Successfully Logged In !!");
    res.redirect("/listings");
}));

module.exports = router;