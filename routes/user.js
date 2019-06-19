const express = require("express");
const { login, register } = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/register", (req, res) => {
  res.render("partials/content/register", {
    title: "CREATE ACCOUNT",
    pageId: "Register"
  });
});

router.get("/login", (req, res) => {
  res.render("partials/content/login", {
    title: "ACCESS ACCOUNT",
    pageId: "Login"
  });
});

router.get("/account-created", (req, res) => {
  res.render("partials/content/register-complete", {
    title: "Registration completed!",
    pageId: "Registered"
  });
});

// POST
router.post("/register", register);
router.post("/login", login);

module.exports = router;
