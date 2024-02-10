const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const db = require("../../database/models");
const jwt = require("jsonwebtoken");

const user = {
    register: async (req, res) => {
        try {

            // Errors
            const resultValidation = validationResult(req);

            //error checking
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "Errores en el formulario",
                });
            };

            // checking if the user is registered
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
            };


            // set default image
            let image = "default.jpg";

            if (req.file && req.file.filename) {
                image = req.file.filename;
            }

            // Create new user
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
            res.status(500).json({
                status: 500,
                error: 'Error interno del servidor al crear un nuevo usuario',
            });
        }
    },
    login: async (req, res) => {
        try {
            // Errors
            const resultValidation = validationResult(req);
            //error checking
            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores de formulario",
                });
            };
            // user search
            db.Users.findOne({
                where: { email: req.body.email },
            })
                .then((user) => {
                    let userToLogin = user;

                    if (userToLogin) {
                        const isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
                        if ((userToLogin.email === req.body.email) && (isOkThePassword == true)) {
                                  
                            const userForToken = {
                                ...user
                            }                            

                            const token = jwt.sign(userForToken, "the-secret-in-code")

                            return res.status(200).json({
                                status: 200,
                                data: token,
                                msg: "Inicio de secion completo",
                            });
                        };
                    } else {
                        return res.status(401).json({
                            status: 401,
                            error: "Credenciales invalidas"
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
    try {

        const userEdit = req.session.userLogged;

        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: resultValidation.mapped(),
                oldData: req.body,
                msg: "errores del formulario"
            });
        };

        let image = userEdit ? userEdit.image : "";

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
                where: { id: userEdit.id }
            }
        )


        res.status(200).json({
            status: 200,
            msg: "Edicion de perfil completa"
        })
    } catch (error) {

        console.log(userEdit)

        res.status(500).json({
            status: 500,
            error: error,
            msg: "error al editar perfil",
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
