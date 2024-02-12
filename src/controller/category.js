const { validationResult } = require("express-validator");
const categoryControllers = {

    registerCategory: async (req, res) => {
        try {

            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(500).json({
                    status: 500,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "error de campos",
                });
            };

            const registerToCategory = await db.Category.findOne({ where: { name: req.body.name } });

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
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`,
            });
        }
    }

};

module.exports = categoryControllers;