const categoryControllers = require("../controller/category");
const {Router} = require("express");
const router = Router();
const categoryValidation = require("../middleware/categoryValidation")
const configureMulter = require("../middleware/multer.Middleware");

const productUpload = configureMulter('category');

router.post("/registerCategory",productUpload.single("image"),categoryValidation,categoryControllers.registerCategory);
router.get("/readCategory",categoryControllers.readCategory);

module.exports = router;