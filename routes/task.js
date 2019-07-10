const express = require("express");
const {
  addTask,
  destroyTask,
  redoTask,
  taskDone,
  updateTask,
  getAll,
  getAllCompleted,
  getAllActive,
  destroyAllActive,
  destroyAllCompleted,
  destroyAllActiveToday,
  destroyAllActiveYesterday,
  destroyAllActivePast,
  destroyAllCompletedToday,
  destroyAllCompletedYesterday,
  destroyAllCompletedPast
} = require("../controllers/task");

// express router
const router = express.Router();

// get
router.get("/", getAllActive);
router.get("/completed", getAllCompleted);
router.get("/all", getAll);

// post
router.post("/add", addTask);
router.post("/update", updateTask);

// delete
router.delete("/remove", destroyTask);
router.delete("/r/all/active", destroyAllActive);
router.delete("/r/all/completed", destroyAllCompleted);
router.delete("/r/active/today", destroyAllActiveToday);
router.delete("/r/active/yesterday", destroyAllActiveYesterday);
router.delete("/r/active/past", destroyAllActivePast);
router.delete("/r/completed/today", destroyAllCompletedToday);
router.delete("/r/completed/yesterday", destroyAllCompletedYesterday);
router.delete("/r/completed/past", destroyAllCompletedPast);

// update
router.patch("/complete", taskDone);
router.patch("/redo", redoTask);

module.exports = router;
