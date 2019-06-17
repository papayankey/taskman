const express = require("express");
const { register } = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.render("index", { pageId: 'Home' });
})

router.get("/user/register", (req, res) => {
  res.render("register", {
    pageTitle: "CREATE ACCOUNT",
    pageId: 'Register'
  });
});

router.get("/user/login", (req, res) => {
  res.render("login", {
    pageTitle: "ACCESS ACCOUNT",
    pageId: 'Login'
  });
});


// POST
router.post("/user/register", register);

router.post("/user/login", (req, res) => {
  res.redirect("/");
});


module.exports = router;