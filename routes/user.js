const express = require("express");
const { register } = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.render("index", { pageId: "Home" });
});

router.get("/user/register", (req, res) => {
  res.render("partials/content/register", {
    title: "CREATE ACCOUNT",
    pageId: "Register"
  });
});

router.get("/user/login", (req, res) => {
  res.render("partials/content/login", {
    title: "ACCESS ACCOUNT",
    pageId: "Login"
  });
});

router.get("/user/account-created", (req, res) => {
  res.render("partials/content/register-complete", {
    title: "Registration completed!",
    pageId: "Registered"
  });
});

// POST
router.post("/user/register", register);

router.post("/user/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
