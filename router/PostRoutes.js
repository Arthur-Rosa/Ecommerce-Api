const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");
const PostValidation = require("../middlewares/postValidation");

const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

// create
router.post(
  "/register",
  PostValidation.postCreateValidation(),
  validate,
  PostController.createPost
);
// find
router.get("/all", authGuard, PostController.findAllPost);
// findById
router.get("/:id", authGuard, PostController.findByIdPost);
// delete
router.delete("/:id", authGuard, PostController.deleteByIdPost);
// update
router.put("/:id", authGuard, PostController.updateByIdPost);

module.exports = router;
