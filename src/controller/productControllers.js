const db = require("../../database/models");
const productControllers= {
    // all products
    allProducts : (req,res)=>{
        db.Product.findAll()
            .then((Product)=>{
                res.json(
                    {
                        status : 200,
                        data : Product,
                        length : Product.length,
                    }
                )
            })
        
    }
}

module.exports = productControllers;