const db = require("../../database/models")
const { validationResult } = require("express-validator");

const productControllers = {

    uploadProduct: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(500).json({
                    status: 500,
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    msg: "error al subir producto",
                });
            };

            let image = "default.jpg"

            if (req.file && req.file.filename) {
                image = req.file.filename;
            };

            const newProduct = {
                name: req.body.name,
                state: 1,
                brand_id: req.body.brand,
                category_id: req.body.category,
                image: image,
                description: req.body.description,
                waist: req.body.waist,
            };

            await db.Product.create(newProduct);

            res.status(200).json({
                status: 200,
                msg: "producto cargado correctamente"
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error,
                msg: `Error al cargar producto`
            });
        };
    },

    updateProduct: async (req, res) => {
        try {
            const resultValidation = validationResult(req);

            if (!resultValidation.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    errors: resultValidation.mapped(),
                    msg: "Errores de informacion de campos"
                });
            };

            const productToEdit = await db.Product.findOne({ name: req.body.name });

            let image = productToEdit ? productToEdit.image : "default.jpg";

            if (req.file && req.file.filename) {
                image = req.file.filename;
            };

            if (!productToEdit) {
                return res.status(404).json({
                    status: 404,
                    msg: "El producto no se encontró",
                });
            }
            await db.Product.update(
                {
                    name: req.body.name,
                    state: 1,
                    brand_id: req.body.brand,
                    category_id: req.body.category,
                    image: image,
                    description: req.body.description,
                    waist: req.body.waist,
                },
                {
                    where: { id: productToEdit.id }
                }
            );

            res.status(200).json({
                status: 200,
                msg: "Edicion de producto realizada correctamente"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`
            });
        };
    },
    allProduct: async (req, res) => {
        try {
            const products = await db.Product.findAll();

            return res.status(200).json({
                status: 200,
                data: products,
                length: products.length,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`
            });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await db.Product.destroy(
                {
                    where: { id: req.params.id }
                }
            );
            return res.status(200).json({
                status: 200,
                msg: "Exito al eliminar el producto",
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`
            });
        }
    },
    findByPkProduct: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.body.id);

            if (!product) {
                return res.status(404).json({
                    status: 404,
                    msg: "Producto no encontrado"
                });
            };
            return res.status(200).json({
                status: 200,
                data: product,
                msg: "Producto encontrado"
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`
            });
        }
    }

}

module.exports = productControllers;