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
            // Buscar el usuario por su ID
            const user = await db.Users.findOne({where : {id : req.params.id}});
    
            // Verificar si el usuario existe
            if (!user) {
                console.log("Usuario no encontrado");
                return res.status(404).json({
                    status: 404,
                    msg: "No se encontro al usuario"
                });
            }
    
            // Validar la entrada
            const resultValidation = validationResult(req);
    
            if (!resultValidation.isEmpty()) {
                console.log("Errores de validación:", resultValidation.array());
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "Errores del formulario"
                });
            }
    
            // Establecer la imagen del usuario
            let image = user ? user.image : "";
    
            console.log("Datos de la solicitud:", req.body);
    
            // Actualizar la imagen si se proporcionó un archivo en la solicitud
            if (req.file && req.file.filename) {
                image = req.file.filename;
            }
    
            // Actualizar los datos del usuario en la base de datos
            await db.Users.update(
                {
                    name: req.body.name,
                    email: req.body.email,
                    image: image,
                    phone: req.body.phone,
                },
                {
                    where: { id: user.id }
                }
            );
    
            // Obtener el usuario actualizado después de la actualización
            const userUpdate = await db.Users.findOne({where : {id : user.id}});
    
            // Generar un token JWT con los datos actualizados del usuario

            const userForToken = userUpdate.dataValues;

            const token = jwt.sign(userForToken, "the-secret-in-code");

            // Responder con el token y un mensaje de éxito
            return res.status(200).json({
                status: 200,
                data: token,
                msg: "Edición de perfil completa"
            });

        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            return res.status(500).json({
                status: 500,
                error: error,
                msg: "Error al editar perfil",
            });
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
    userOrders: async (req, res) => {
        try {
            const userID = req.params.id;

            const userOrders = await db.Orders.findAll({ where: { user_id: userID } });

            const productIDs = userOrders.map(order => order.product_id);

            const products = await db.Product.findAll({
                where: {
                    id: productIDs
                }
            });

            return res.status(200).json({
                status: 200,
                products: products,
                msg: "Exito en consular Ordenes"
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                msg: "Error al solicitar ordenes"
            })
        };
    },
    userFavorites: async (req, res) => {
        try {
            const userID = req.params.id;

            const userFavorites = await db.Favorites.findAll({ where: { user_id: userID } });

            const productsIDs = userFavorites.map(favorites => favorites.product_id);

            const products = await db.Products.findAll({
                where: { id: productsIDs }
            });

            return res.status(200).json({
                status: 200,
                products: products,
                msg: "Exito en consular Favoritos"
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                msg: "Error al solicitar favoritos"
            })
        };
    }
};

module.exports = user;
