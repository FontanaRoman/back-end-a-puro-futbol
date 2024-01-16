const {body} = require("express-validator");

const validationLogin = [
    body("email")
        .isEmpty()
        .withMessage("Tienes que ingresar un email")
        .isEmail()
        .withMessage("Tienes que ingresar un email valido")
        .isLength({ min: 15, max: 30 })
        .withMessage('El email debe tener entre 15 y 30 caracteres'),
    body("password")
        .isEmpty()
        .withMessage("Tienes que ingresar la contraseña"),
];

module.exports = validationLogin;