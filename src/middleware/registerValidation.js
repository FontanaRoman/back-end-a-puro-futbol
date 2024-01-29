const { body } = require("express-validator");

const editValidationUser = [
    body("name")
        .notEmpty()
        .withMessage("Tienes que ingresar un nombre")
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre debe tener entre 3 y 30 caracteres'),
    body("email")
        .notEmpty()
        .withMessage("Tienes que ingresar un email")
        .isEmail()
        .withMessage("Tienes que ingresar un email valido")
        .isLength({ min: 8, max: 30 })
        .withMessage('El email debe tener entre 15 y 30 caracteres'),
    body("phone")
        .notEmpty()
        .withMessage("Tienes que ingresar un telefono"),
    body("password")
        .notEmpty()
        .withMessage("Tienes que ingresar una contraseña")
        .isLength({ min: 5 })
        .withMessage("La contraseña debe tener minimo 5 caracteres"),
];

module.exports = editValidationUser;