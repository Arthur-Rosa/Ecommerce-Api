const express = require("express");
const router = express.Router();

const {
  createUser,
  seeAllUsers,
  login,
  seeUser,
  deleteUser,
  updateUser,
} = require("../controllers/UserController");

const authGuard = require("../middlewares/authGuard");
const { userValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

// create
router.post("/register", userValidation(), validate, createUser);
// find
router.get("/all", authGuard, seeAllUsers);
// login
router.post("/login", login);
// findById
router.get("/:id", authGuard, seeUser);
// delete
router.delete("/:id", authGuard, deleteUser);
// update
router.put("/:id", authGuard, updateUser);

module.exports = router;
