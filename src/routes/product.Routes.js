const {Router} = require("express");
const router = Router();
const productControllers = require("../controller/productControllers");

router.get("/",productControllers.allProducts);

module.exports = router;