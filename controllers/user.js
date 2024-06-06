const User = require("../models/user");

// Signup Page Render
const handleGetSignupPage = (req, res) => {
  res.render("users/signup");
};

// Signup User
const handlePostSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });

    const registeredUser = await User.register(newUser, password);

    // console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "New User Registered!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signup");
  }
};

// Login Page Render
const handleGetLoginPage = (req, res) => {
  res.render("users/login");
};

// Login User
const handlePostLoginUser = async (req, res) => {
  // req.username = req.user.username;
  req.flash("success", "Successfully Logged In !!");

  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout User
const handleUserLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "User Logged Out!!");
    res.redirect("/listings");
  });
};

module.exports = {
  handleGetSignupPage,
  handlePostSignupUser,
  handleGetLoginPage,
  handlePostLoginUser,
  handleUserLogout,
};
