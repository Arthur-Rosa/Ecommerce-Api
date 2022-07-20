const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("o Nome é obrigatório")
      .isLength({
        min: 3,
      })
      .withMessage("Usuário precisa ter mais de Caracteres"),
    body("email")
      .isString()
      .withMessage("o Email é obrigatório")
      .isEmail()
      .withMessage("Email precisa ser válido"),
    body("password")
      .isString()
      .withMessage("a Senha é obrigatória")
      .isLength({
        min: 6,
      })
      .withMessage("Senha precisa ter mais Caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("a ConfirmaçãoSenha é obrigatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais");
        }
        return true;
      }),
  ];
};

const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("o Email é obrigatório")
      .isEmail()
      .withMessage("Email precisa ser válido"),
    body("password").isString().withMessage("a Senha é obrigatória"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name").isString().withMessage("o Nome é obrigatório"),
    body("email")
      .isString()
      .withMessage("o Email é obrigatório")
      .isEmail()
      .withMessage("Email precisa ser válido"),
    body("password").isString().withMessage("a Senha é obrigatória"),
  ];
};

module.exports = {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
};
