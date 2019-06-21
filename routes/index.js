const express = require("express");

// express router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { pageId: "Home" });
});

module.exports = router;
