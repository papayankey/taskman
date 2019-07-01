const express = require("express");
const {
  getRegister,
  getLogin,
  getSignOut,
  postRegister,
  postLogin
} = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/signup", getRegister);
router.get("/login", getLogin);
router.get("/logout", getSignOut);

// POST
router.post("/signup", postRegister);
router.post("/login", postLogin);

module.exports = router;
