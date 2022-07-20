const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { title, description, value, author } = req.body;

  if (title === "" || description === "" || value === "" || author === "") {
    res.status(404).json({ msg: "Campos Faltando" });
  }

  try {
    const post = await Post.create({
      title,
      description,
      value,
      author,
    });

    if (!post) {
      return res.status(422).json({ msg: "Não foi possível Criar Post" });
    }

    return res.status(201).json({ post });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const findByIdPost = async (req, res) => {
  const { id } = req.params;

  if (id === "") {
    return res.status(404).json({ msg: "Id Inválido" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post não encontrado" });
    }

    return res.status(200).json({ post });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const findAllPost = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) {
      return res.status(404).json({ msg: "Nenhum post encontrado" });
    }

    return res.status(201).json({ posts });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const deleteByIdPost = async (req, res) => {
  const { id } = req.params;

  if (id === "") {
    return res.status(404).json({ msg: "Id Inválido " });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post não encontrado" });
    }

    const postDeleted = await Post.deleteById(id);

    if (!postDeleted) {
      return res.status(404).json({ msg: "Ocorreu um erro" });
    }

    return res.status(200).json({ msg: "Post deletado com sucesso" });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const updateByIdPost = async (req, res) => {
  const { id } = req.params;
  const { title, description, value, author } = req.body;

  if (id === "") {
    return res.status(404).json({ msg: "Id Inválido" });
  } else if ((title === "", description === "", value === "", author === "")) {
    return res.status(404).json({ msg: "Campos faltando" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "  Post não encontrado" });
    }

    await Post.findByIdAndUpdate(id, {
      title,
      description,
      value,
      author,
    });

    return res.status(200).json({ msg: "Post atualizado com sucesso" });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

module.exports = {
  createPost,
  findByIdPost,
  findAllPost,
  deleteByIdPost,
  updateByIdPost,
};
