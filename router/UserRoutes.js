const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/UserController");

const authGuard = require("../middlewares/authGuard");
const { userValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

router.post("/register", userValidation(), validate, createUser);

module.exports = router;
