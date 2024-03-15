const brandController = require("../controller/brand");
const {Router} = require("express");
const router = Router();

router.post("/registerBrand", brandController.registerBrand);
router.get("/readBrand", brandController.readBrand);

module.exports = router;