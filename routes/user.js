const express = require("express");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.send("<h1>Taskman</h1>");
})

router.get("/user/register", (req, res) => {
  res.send("<h1>Registration Page!</h1>");
});

router.get("/user/login", (req, res) => {
  res.send("<h1>Login Page!</h1>");
});


// POST
router.post("/user/register", (req, res) => {
  res.send("Registration Complete!");
});

router.post("/user/login", (req, res) => {
  res.redirect("/");
});


module.exports = router;