const express = require("express");
const { createTask } = require("../controllers/task");

// express router
const router = express.Router();

// GET
router.get("/", (req, res) => {
  res.render("task", {
    pageId: "Task"
  });
});

module.exports = router;
