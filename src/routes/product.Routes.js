const {Router} = require("express");
const router = Router();
const configureMulter = require("../middleware/multer.Middleware");
const validateProduct = require("../middleware/productValidation");
const controller = require("../controller/product")

const productUpload = configureMulter('products');

router.post("/uploadProduct", productUpload.single("image"), validateProduct, controller.uploadProduct);

router.put("/editProduct", productUpload.single("image"),validateProduct, controller.updateProduct);

router.post("allProduct", controller.allProduct);

router.post("detailProduct/:id", controller.findByPkProduct);

router.post("favoriteProduct/:productId/:userId");

router.delete("deleteProduct", controller.deleteProduct);

module.exports = router;
