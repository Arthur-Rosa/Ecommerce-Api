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
  console.log("Rodando na porta 5000");
});

/* 
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
*/