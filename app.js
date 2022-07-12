const express = require("express");
require("dotenv").config();

const port = process.env.PORT || "8080";
const app = express();

const cors = require("cors");
app.use(express.json());
require("./config/dbConfig");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, Authorization"
  );
  app.use(cors());
  next();
});

const router = require("./router/Router");
app.use(router);

app.listen(port, () => {
  console.log("Rodando na porta 5000");
});
