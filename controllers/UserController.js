const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

const createUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ msg: "E-mail já existente" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    if (!newUser) {
      return res.status(422).json({ msg: "Não foi possível Criar Usuario" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }

  return res.status(201).json({
    _id: newUser.id,
    token: createToken(newUser.id),
  });
};

const seeAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(404).json({
        msg: "Não foi possível encontrar usuários",
      });
    }

    return res.status(201).json({ users });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
};

const seeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "usuário não encontrado",
      });
    }

    return res.status(201).json({ user });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (id === "") {
    return res.status(404).json({ msg: "Id Inválido" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const userDeleted = await User.deleteById(id);

    if (!userDeleted) {
      return res.status(404).json({ msg: "Ocorreu um erro " });
    }

    return res.status(201).json({ msg: "Usuário deletado com sucesso" });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "sem dados" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        msg: "Usuário não encontrado",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        msg: "Email ou senha Incorreta",
      });
    }

    var token = jwt.sign({ id: user.id }, process.env.secret, {
      expiresIn: "7d",
    });

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    await User.findByIdAndUpdate(id, {
      name: name,
      email: email,
    });

    return res.status(201).json({
      msg: "Usuário atualizado com Sucesso",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
};

module.exports = {
  login,
  createUser,
  seeAllUsers,
  seeUser,
  deleteUser,
  updateUser,
};
