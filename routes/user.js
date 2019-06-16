const express = require("express");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.render("index");
})

router.get("/user/register", (req, res) => {
  res.render("register");
});

router.get("/user/login", (req, res) => {
  res.render("login");
});


// POST
router.post("/user/register", (req, res) => {
  res.send("Registration Complete!");
});

router.post("/user/login", (req, res) => {
  res.redirect("/");
});


module.exports = router;