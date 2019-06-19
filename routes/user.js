const express = require("express");
const { register } = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.render("index", { pageId: "home" });
});

router.get("/user/register", (req, res) => {
  res.render("partials/content/register", {
    pageTitle: "CREATE ACCOUNT",
    pageId: "register"
  });
});

router.get("/user/login", (req, res) => {
  res.render("partials/content/login", {
    pageTitle: "ACCESS ACCOUNT",
    pageId: "login"
  });
});

// POST
router.post("/user/register", register);

router.post("/user/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
