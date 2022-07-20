const express = require("express");
const router = express();

router.use("/shop/users", require("./UserRoutes"));
router.use("/shop/posts", require("./PostRoutes"));

router.get("/", (req, res) => {
  res.send("started");
});

module.exports = router;
