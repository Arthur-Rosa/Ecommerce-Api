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

const seeAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  if (!users) {
    res.status(422).json({
      msg: "Não foi possível encontrar usuários",
    });
  }

  res.status(201).json({
    users,
  });
};

const seeUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({
      msg: "usuário não encontrado",
    });
    return;
  }

  res.status(201).json({
    user,
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({
      msg: "usuário não encontrado",
    });
    return;
  }

  res.status(201).json({
    msg: "usuário deletado com sucesso",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      msg: "usuário não encontrado",
    });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({
      msg: "Email ou senha Incorreta",
    });
    return;
  }

  var token = jwt.sign({ id: user.id }, process.env.secret, {
    expiresIn: "7d",
  });

  res.status(201).json({
    token,
  });
};

module.exports = {
  login,
  createUser,
  seeAllUsers,
  seeUser,
  deleteUser,
};
