const express = require("express");
const { login, register } = require("../controllers/user");

// express router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { pageId: "Home" });
});

module.exports = router;
