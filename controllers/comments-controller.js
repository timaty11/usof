import Comment from "../models/Comment.js";
import Like from "../models/Like.js";


class CommentsController {

    async getCommentDataById (req, res, next) {
        try {
            const { comment_id } = req.params;

            const data = await Comment.getCommentData("id", comment_id);

            res.status(200);
            res.json({ message: "Got comment data!", commentData: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY getCommentDataById " + e);

            next(e);
        }
    }

    async getLikesForCommentById (req, res, next) {
        try {
            const { comment_id } = req.params;

            const data = await Like.getAllLikesForEntity(comment_id);

            res.status(200);
            res.json({ message: "Got likes list!", likes_list: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY getLikesForCommentById " + e);

            next(e);
        }
    }

    async createLikeForCommentById (req, res, next) {
        try {
            const { comment_id } = req.params;
            const { author_id, type } = req.body;

            await Like.addLike({ entity_id:comment_id, author_id:author_id, type:type });

            res.status(201);
            res.json({ message: "Added like successfully!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY createLikeForCommentById " + e);

            next(e);
        }
    }

    async updateCommentById (req, res, next) {
        try {
            const { category_id } = req.params;

            await Comment.setCommentData(req.body, category_id);

            res.status(200);
            res.json({ message: "Updated comment!!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY updateCommentById " + e);

            next(e);
        }
    }

    async deleteCommentById (req, res, next) {
        try {
            const { comment_id } = req.params;

            await Comment.deleteComment(comment_id);

            res.status(200);
            res.json({ message: "Deleted category!!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY deleteCommentById " + e);

            next(e);
        }
    }

    async deleteLikeForCommentById (req, res, next) {
        try {
            const { comment_id } = req.params;

            await Like.deleteLike(comment_id);

            res.status(200);
            res.json({ message: "Like has been deleted!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA COMMENT CONTROLLERY deleteLikeForCommentById " + e);

            next(e);
        }
    }

}

export default new CommentsController();