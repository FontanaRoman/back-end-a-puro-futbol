const { validationResult } = require("express-validator");
const db = require("../../database/models")
const categoryControllers = {

    registerCategory: async (req, res) => {
        try {

            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "error de campos",
                });
            };

            const registerToCategory = await db.Category.findOne({ where: { name: req.body.name } });

            let image = "default.jpg";

            if (req.file && req.file.filename) {
                image = req.file.filename;
            }

            if (!registerToCategory) {
                await db.Category.create({
                    name: req.body.name,
                    image: req.file.filename,
                })

                return res.status(200).json({
                    status: 200,
                    msg: "Exito al registrar una nueva categoria",
                });
            } else {
                return res.status(409).json({
                    status: 409,
                    msg: "Error al registrar categoria, la categoria ya esta registrada",
                });
            }
        } catch (error) {
            console.log("aca ocurrio un error", error)
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`,
            });
        }
    },
    readCategory: async (req, res) => {
        try {

            let categorys = await db.Category.findAll();
            categorys = categorys.map(category => category.dataValues);

            if (categorys) {
                return res.status(200).json({
                    status: 200,
                    data: categorys,
                    msg: "exito al solicitar categorias",
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    data: "No hay categorias registradas",
                    msg: "No hay categorias registradas",
                });
            };

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error,
                msg: "Error interno al solicitar categorias"
            })
        }
    }

};

module.exports = categoryControllers;