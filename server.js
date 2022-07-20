const express = require("express");
require("dotenv").config();

const port = process.env.PORT || "3000";
const app = express();

const cors = require("cors");
require("./config/dbConfig");

app.use(cors());
app.use(express.json());
const router = require("./router/Router");
app.use(router);
app.listen(port, () => {
  console.log("Rodando na porta" + port);
});
