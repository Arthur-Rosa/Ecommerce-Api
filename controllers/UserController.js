const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { default: mongoose, mongo } = require("mongoose");

const secret = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: "7d",
    }
  );
};

const createUser = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user) {
    res.status(422).json({
      msg: "E-mail já existente",
    });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res.status(422).json({
      msg: "Não foi possível Criar Usuario",
    });
    return;
  }

  res.status(201).json({
    _id: newUser.id,
    token: createToken(newUser.id),
  });
};
module.exports = {
  createUser,
};
