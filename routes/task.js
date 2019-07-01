const express = require("express");
const { getAllTask, createTask, removeTask } = require("../controllers/task");

// express router
const router = express.Router();

// GET
router.get("/", getAllTask);
router.get("/r/:id", removeTask);

// POST
router.post("/add", createTask);

module.exports = router;
