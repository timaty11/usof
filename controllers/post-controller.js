import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Category from "../models/Category.js";
import Like from "../models/Like.js";
import tokenService from "../services/token-service.js";


class PostController {

    // Posts section

    async getAllPosts (req, res, next) {
        try {
            const data = await Post.getAllPosts();

            res.status(200);
            res.json({ message: "Got posts list!", postsList: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY getAllPosts " + e);

            next(e);
        }
    }

    async getPostById (req, res, next) {
        try {
            const { post_id } = req.params;
            const data = await Post.getPostData("id", post_id);

            res.status(200);
            res.json({ message: "Got post data!", data: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY getPostById " + e);

            next(e);
        }
    }

    async getAllCategoriesForPostId (req, res, next) {
        try {
            const { post_id } = req.params;
            const data = await Category.getAllCategoriesForPost(post_id);

            res.status(200);
            res.json({ message: "Got categories list for provided post id!", post_id: post_id, comments_list: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY getAllCategoriesForPostId " + e);

            next(e);
        }
    }

    async createPost (req, res, next) {
        try {
            // const { author_id, title, content } = req.body;
            console.log(await Post.addPost(req.body));

            res.status(201);
            res.json({ message: "Post created!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY createPost " + e);

            next(e);
        }
    }

    async updatePostById (req, res, next) {
        try {
            const { post_id } = req.params;

            await Post.setMultipleColumnsPostData(req.body, post_id);

            res.status(200);
            res.json({ message: "Post data has been updated!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY updatePostById " + e);

            next(e);
        }
    }

    async deletePostById (req, res, next) {
        try {
            const { post_id } = req.params;

            await Post.deletePost(post_id);

            res.status(200);
            res.json({ message: "Post data has been deleted!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY deletePostById " + e);

            next(e);
        }
    }

    
    // Comments section

    async getAllCommentsByPostId (req, res, next) {
        try {
            const { post_id } = req.params;
            const data = await Comment.getAllCommentsForPost(post_id);

            res.status(200);
            res.json({ message: "Got comments list for provided post id!", post_id: post_id, comments_list: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY getAllCommentsByPostId " + e);

            next(e);
        }
    }

    async createCommentForPostId (req, res, next) {
        try {
            const { post_id } = req.params;
            const { author_id, content } = req.body;

            // const tokenData = tokenService.tokenVerify(token);

            const data = await Comment.addComment({ post_id: post_id, author_id: author_id, content: content });
            console.log(data);

            res.status(201);
            // res.json({ message: "Created new comment!", comment_id: data.comment_id });
            res.json({ message: "Created new comment!" });


        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY createCommentForPostId " + e);

            next(e);
        }
    }


    // Likes section

    async getAllLikesForPostId (req, res, next) {
        try {
            const { post_id } = req.params;
            const data = await Like.getAllLikesForEntity(post_id);

            res.status(200);
            res.json({ message: "Got likes list for provided post id!", post_id: post_id, likes_list: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY getAllCommentsByPostId " + e);

            next(e);
        }
    }

    async createLikeForPostId (req, res, next) {
        try {
            const { post_id } = req.params;
            const { author_id, type } = req.body;

            await Like.addLike({ entity_id:post_id, author_id:author_id, type:type });

            res.status(201);
            res.json({ message: "Added like successfully!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY createLikeForPostId " + e);

            next(e);
        }
    }

    async deleteLikeForPostId (req, res, next) {
        try {
            const { post_id } = req.params;

            await Like.deleteLike(post_id);

            res.status(200);
            res.json({ message: "Like has been deleted!" });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA POST CONTROLLERY deleteLikeForPostId " + e);

            next(e);
        }
    }

}

export default new PostController();