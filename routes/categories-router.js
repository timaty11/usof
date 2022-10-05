import Express from 'express';
import categoriesController from "../controllers/categories-controller.js";

const router = Express.Router();


router.get("/", categoriesController.getAllCategories);
router.get("/:category_id", categoriesController.getCategoryData);
router.get("/:category_id/posts", categoriesController.getAllPostsForCategory);
router.post("/", categoriesController.createCategory);
router.patch("/:category_id", categoriesController.updateCategory);
router.delete("/:category_id", categoriesController.deleteCategory);


export default router;
