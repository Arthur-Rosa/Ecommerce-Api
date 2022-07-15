const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

const authGuard = require("../middlewares/authGuard");
const { userValidation } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidation");

// create
router.post("/register", userValidation(), validate, UserController.createUser);
// find
router.get("/all", authGuard, UserController.seeAllUsers);
// login
router.post("/login", UserController.login);
// findById
router.get("/:id", authGuard, UserController.seeUser);
// delete
router.delete("/:id", authGuard, UserController.deleteUser);
// update
router.put("/:id", authGuard, UserController.updateUser);

module.exports = router;
