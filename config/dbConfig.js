const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.y7na9.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Conectou Mongo !");
    return dbConn;
  } catch (e) {
    console.log("error : " + e);
  }
};

conn();
module.exports = conn;
