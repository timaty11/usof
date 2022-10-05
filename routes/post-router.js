import Express from 'express';
import postController from "../controllers/post-controller.js";

const router = Express.Router();

// POSTS
router.get("/", postController.getAllPosts);
router.get("/:post_id", postController.getPostById);
router.get("/:post_id/categories", postController.getAllCategoriesForPostId);
router.post("/", postController.createPost);
router.patch("/:post_id", postController.updatePostById);
router.delete("/:post_id", postController.deletePostById);


// COMMENTS
router.get("/:post_id/comments", postController.getAllCommentsByPostId);
router.post("/:post_id/comments", postController.createCommentForPostId);

// add patch and delete for comments if there is time
// router.patch("/:post_id/comments/:comment_id", postController.updateCommentForPostId);
// router.delete("/:post_id/comments:comment_id", postController.deleteCommentForPostId);


// LIKES
router.get("/:post_id/like", postController.getAllLikesForPostId);
router.post("/:post_id/like", postController.createLikeForPostId);
router.delete("/:post_id/like", postController.deleteLikeForPostId);


export default router;
