const express = require("express");
const { createTask } = require("../controllers/task");

const modifyName = require("../helpers/firstToCapitalize");

// express router
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  if (req.session.user) {
    let { name } = req.session.user;
    name = await modifyName(name);
    res.render("task", {
      pageId: "Task",
      user: {
        name
      }
    });
    return;
  }

  res.status(401);
  res.redirect("/user/register");
});

module.exports = router;
