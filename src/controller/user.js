const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../../database/models");

const user = {
    register: async (req, res) => {
        try {
            // Verificar si el usuario ya está registrado
            const existingUser = await db.Users.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    msg: "Este correo electrónico ya está registrado",
                });
            }

            // Validar los campos del formulario
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    data: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "Errores en el formulario",
                });
            }

            // Configurar la imagen predeterminada
            let image = "default.jpg";

            if (req.file && req.file.filename) {
                image = req.file.filename;
            }

            // Crear un nuevo usuario
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                rol: "admin",
                image: image,
                registerDate: new Date(),
                password: bcrypt.hashSync(req.body.password, 10),
                phone: req.body.phone,
            };

            const createdUser = await db.Users.create(newUser);

            res.status(200).json({
                status: 200,
                data: createdUser,
                msg: "Registro creado correctamente",
            });
        } catch (error) {
            console.error('Error al crear un nuevo usuario:', error);
            res.status(500).json({
                status: 500,
                error: 'Error interno del servidor al crear un nuevo usuario',
            });
        }
    },
};

module.exports = user;
