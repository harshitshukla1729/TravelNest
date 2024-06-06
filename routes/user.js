const express = require("express");
const router = express.Router();

const User = require("../models/user");
const wrapAsync = require("../utils/warpAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email });

        const registeredUser = await User.register(newUser, password);

        // console.log(registeredUser);

        req.login(registeredUser, ((err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "New User Registered!");
            res.redirect("/listings");
        }));
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/users/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/users/login", failureFlash: true }), wrapAsync(async (req, res) => {
    // req.username = req.user.username;
    req.flash("success", "Successfully Logged In !!");

    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}));

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "User Logged Out!!");
        res.redirect("/listings");
    })
})

module.exports = router;