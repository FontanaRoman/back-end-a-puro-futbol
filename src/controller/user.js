const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../../database/models");
const { where } = require("sequelize");

const user = {
    register: async (req, res) => {
        try {

            // Validar los campos del formulario
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "Errores en el formulario",
                });
            }

            // Verificar si el usuario ya está registrado
            const existingUser = await db.Users.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    errors: {
                        email: {
                            msg: "Este correo ya está registrado",
                        },
                    },
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

            await db.Users.create(newUser);

            res.status(200).json({
                status: 200,
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
    login: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores de formulario",
                });
            };

            db.Users.findOne({
                where: { email: req.body.email },
            })
                .then((user) => {
                    let userToLogin = user;

                    if (userToLogin) {
                        const isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                        if ((userToLogin.email === req.body.email) && (isOkThePassword == true)) {
                            delete userToLogin.password;
                            req.session.userLogged = userToLogin;
                                console.log(req.session.userLogged.name);                 
                            return res.status(200).json({
                                status: 200,
                                data: req.session.userLogged,
                                msg: "Inicio de secion completo",
                            });
                        };
                    } else {
                        return res.status(400).json({
                            status: 400,
                            error: "Error al iniciar secion"
                        });
                    };
                });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                error: error,
                msg: "Error interno del servidor al intentar iniciar secion",
            });
        };
    },
    edit: async (req, res) => {
        console.log(req.session.userLogged.name, "edit");

    try {
        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: resultValidation.mapped(),
                oldData: req.body,
                msg: "errores del formulario"
            });
        };

        let image = req.session.userLogged ? req.session.userLogged.image : "";

        if (req.file && req.file.filename) {
            image = req.file.filename;
        };

        await db.Users.update(
            {
                name: req.body.name,
                email: req.body.email,
                image: image,
                phone: req.body.phone,
            },
            {
                where: { id: req.session.userLogged.id }
            }
        )


        res.status(200).json({
            status: 200,
            msg: "Edicion de perfil completa"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error,
            msg: "error al editar perfil"
        })
    }
},
    destroy: async (req, res) => {
        try {
            req.session.destroy()
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error,
                msg: "error al cerrar sesion",
            });
        };
    },
};

module.exports = user;
