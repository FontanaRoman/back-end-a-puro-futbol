const db = require("../../database/models")
const brandControllers = {

    registerBrand: async (req,res) => {
        try {
            
            const registerToBrand = await db.Brand.findOne({where : {name : req.body.name}});

            if(!registerToBrand){

                await db.Brand.create({
                    name: req.body.name,
                })

                return res.status(200).json({
                    status: 200,
                    msg: "Marca registrada exitosamente",
                });
            }else{
                return res.status(409).json({
                    status: 409,
                    msg: "Error al registrar marca, la marca ya esta registrada",
                });
            }
        } catch (error) {
            console.log("aca ocurre un error", error)
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`,
            });
        }
    },
    readBrand: async (req,res) => {
        try {
             let brand = await db.Brand.findAll();
             brand = brand.map(brand => brand.dataValues);
             if(brand){
                return res.status(200).json({
                    status: 200,
                    data: brand,
                    msg: "Exito al solicitar marcas",
                }); 
             }else{
                return res.status(404).json({
                    status: 404,
                    msg: "No se an encontrado marcas o no estan registradas",
                });
             };
        } catch (error) {
            return res.status(500).json({
                status: 500,
                errors: error,
                msg: "Error interno al solicitar marcas",
            });
        };
    }

};

module.exports = brandControllers;