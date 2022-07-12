const express = require("express");
const router = express();

router.use("/shop/users", require("./UserRoutes"));

router.get("/", (req, res) => {
  res.send("funcionou !");
});

module.exports = router;
