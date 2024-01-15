const {Router} = require("express");
const router = Router();
const configureMulter = require("../middleware/multer.Middleware");
const validationRegister = require("../middleware/registerValidation");
const userController = require("../controller/user")

const userUpload = configureMulter('users');

router.post("/register", userUpload.single("image"), validationRegister, userController.register);


module.exports = router;
