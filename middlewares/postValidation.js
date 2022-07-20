const { body } = require("express-validator");

const postCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("o Título é obrigatório")
      .isLength({ min: 3 })
      .withMessage("o Título precisa ter mais de Caracteres"),
    body("description")
      .isString()
      .withMessage("a Descrição é obrigatória")
      .isLength({ min: 3 })
      .withMessage(" Descrição precisa ter mais caracteres "),
    body("value").isString().withMessage("o Valor é obrigatório"),
    body("author")
      .isString()
      .withMessage("o Author é obrigatório")
      .isLength({ min: 3 })
      .withMessage(" Descrição precisa ter mais caracteres "),
  ];
};

module.exports = {
  postCreateValidation,
};
