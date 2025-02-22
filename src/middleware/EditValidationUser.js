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
    body('image').custom((value, { req }) => {
        // Verificar si el campo image está presente en la solicitud
        if (req.files && req.files.image) {
            const image = req.files.image;

            // Verificar que sea una imagen (puedes ajustar esto según tus necesidades)
            if (!image.mimetype.startsWith('image/')) {
                throw new Error('El archivo debe ser una imagen');
            };

            // Verificar el tamaño del archivo (ejemplo: máximo 5MB)
            const maxSize = 3 * 1024 * 1024; // 3MB en bytes
            if (image.size > maxSize) {
                throw new Error('La imagen no debe superar los 3MB');
            };
        }

        // Si no se proporciona una imagen, no hay errores de validación
        return true;
    })
];

module.exports = editValidationUser;