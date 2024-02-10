const { body } = require('express-validator');

const validateProduct = [
    body('name')
        .notEmpty().withMessage('El nombre del producto es requerido')
        .isLength({ max: 50 }).withMessage('El nombre del producto debe tener como máximo 50 caracteres'),

    body('brand_id')
        .notEmpty().withMessage('Selecciona la marca'),

    body('category_id')
        .notEmpty().withMessage('Selecciona una categoria'),

    body('description')
        .notEmpty().withMessage('Ingresa una descripcion')
        .isLength({ max: 255 }).withMessage('La descripción debe tener como máximo 255 caracteres'),

    body('waist')
        .notEmpty().withMessage('Ingresa los talles disponibles'),

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

module.exports = validateProduct;
