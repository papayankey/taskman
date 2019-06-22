const express = require("express");
const {
  getRegister,
  getLogin,
  getRegistrationSuccess,
  postRegister,
  postLogin
} = require("../controllers/user");

// express router
const router = express.Router();

// GET
router.get("/signup", getRegister);
router.get("/login", getLogin);
router.get("/account-created", getRegistrationSuccess);

// POST
router.post("/signup", postRegister);
router.post("/login", postLogin);

module.exports = router;
