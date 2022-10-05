import Express from 'express';

import AuthController from '../controllers/auth-controller.js';
import AuthValidationController from '../middlewares/auth-validation-controller.js';


const router = Express.Router();

router.post("/register", AuthValidationController.registerValidation, AuthController.AuthControllerRegister);
router.get("/mailconfirm/:token", AuthController.AuthControllerEmailConfirm);

router.post("/login", AuthValidationController.loginValidation, AuthController.AuthControllerLogin);
router.post("/logout", AuthController.AuthControllerLogout);

router.post("/password-reset", AuthController.AuthControllerPassReset);
router.get("/password-reset/:confirm_token", AuthController.AuthControllerPassResetConfirm);
router.post("/password-reset/:confirm_token", AuthController.AuthControllerPassResetApply);


export default router;
