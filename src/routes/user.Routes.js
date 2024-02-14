const {Router} = require("express");
const router = Router();
const configureMulter = require("../middleware/multer.Middleware");
const validationRegister = require("../middleware/registerValidation");
const editValidationUser = require("../middleware/EditValidationUser");
const userController = require("../controller/user");

const userUpload = configureMulter('users');

router.post("/register", validationRegister, userController.register);

router.post("/login", userController.login);

router.put("/edit-data-user/:id", userUpload.single("image"), editValidationUser, userController.edit)

router.post("/destroy", userController.destroy);

module.exports = router;
