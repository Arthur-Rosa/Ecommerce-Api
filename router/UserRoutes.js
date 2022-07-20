const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const userValidation = require("../middlewares/userValidations");

const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

// create
router.post(
  "/register",
  userValidation.userCreateValidation(),
  validate,
  UserController.createUser
);
// login
router.post(
  "/login",
  userValidation.userLoginValidation(),
  validate,
  UserController.login
);
// update
router.put(
  "/:id",
  authGuard,
  userValidation.userUpdateValidation(),
  UserController.updateUser
);
// find
router.get("/all", authGuard, UserController.seeAllUsers);
// findById
router.get("/:id", authGuard, UserController.seeUser);
// delete
router.delete("/:id", authGuard, UserController.deleteUser);

module.exports = router;
