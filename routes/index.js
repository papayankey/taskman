const express = require("express");

// express router
const router = express.Router();

router.get("/", (req, res) => {
  // redirect to task
  if (req.session.user) {
    res.redirect("./task");
    return;
  }

  res.render("index", { pageId: "Home" });
});

module.exports = router;
