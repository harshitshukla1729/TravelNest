const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/warpAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

const {
  handleGetSignupPage,
  handlePostSignupUser,
  handleGetLoginPage,
  handlePostLoginUser,
  handleUserLogout,
} = require("../controllers/user");

router.get("/signup", handleGetSignupPage);

router.post("/signup", wrapAsync(handlePostSignupUser));

router.get("/login", handleGetLoginPage);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  wrapAsync(handlePostLoginUser)
);

router.get("/logout", handleUserLogout);

module.exports = router;
