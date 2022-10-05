import Express from 'express';
import commentsController from "../controllers/comments-controller.js";

const router = Express.Router();


router.get("/:comment_id", commentsController.getCommentDataById);
router.get("/:comment_id/like", commentsController.getLikesForCommentById);
router.post("/:comment_id/like", commentsController.createLikeForCommentById);
router.patch("/:comment_id", commentsController.updateCommentById);
router.delete("/:comment_id", commentsController.deleteCommentById);
router.delete("/:comment_id/like", commentsController.deleteLikeForCommentById);


export default router;
