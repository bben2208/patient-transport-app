const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const { ensureAuthenticated } = require("../middleware/auth");

const router = express.Router();

// GET Login Page
router.get("/login", (req, res) => {
  res.render("login", { messages: req.flash("error") });
});

// GET Registration Page
router.get("/register", (req, res) => {
  res.render("register");
});

// GET Dashboard (protected route)
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user });
});

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Create and save the new user (password hashing is handled in the model pre-save hook)
    const user = new User({ username, password });
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error creating user");
  }
});

// Login Route
router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true
}));

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
});

module.exports = router;
