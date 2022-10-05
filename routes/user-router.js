import Express from 'express';
import userController from '../controllers/user-controller.js';

const router = Express.Router();

router.get("/", userController.getAllUsers);
router.get("/:user_id", userController.getUserData);
router.post("/", userController.createNewUser);
router.patch("/avatar", userController.uploadUserAvatar);
router.patch("/:user_id", userController.updateUserData);
router.delete("/:user_id", userController.deleteUser);

export default router;
