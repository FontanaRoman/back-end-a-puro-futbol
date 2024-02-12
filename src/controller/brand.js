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
            return res.status(500).json({
                status: 500,
                msg: `Error interno del servidor`,
            });
        }
    }

};

module.exports = brandControllers;