import Category from "../models/Category.js";
import Post from "../models/Post.js";


class CategoriesController {

    async getAllCategories (req, res, next) {
        try {
            const data = await Category.getAllCategories();

            res.status(200);
            res.json({ message: "Got categories list!", postsList: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY getAllCategories " + e);

            next(e);
        }
    }

    async getCategoryData (req, res, next) {
        try {
            const { category_id } = req.params;

            const data = await Category.getCategoryData("id", category_id);

            res.status(200);
            res.json({ message: "Got category data!", postsList: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY getCategoryData " + e);

            next(e);
        }
    }

    async getAllPostsForCategory (req, res, next) {
        try {
            const { category_id } = req.params;

            const data = await Post.getPostData("categories_id", [category_id]);

            res.status(200);
            res.json({ message: "Got posts list for provided category!", postsList: data });

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY getAllPostsForCategory " + e);

            next(e);
        }
    }

    async createCategory (req, res, next) {
        try {
            await Category.addCategory(req.body);

            res.status(200);
            res.json({ message: "Created category!!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY createCategory: " + e);

            next(e);
        }
    }

    async updateCategory (req, res, next) {
        try {
            const { category_id } = req.params;
            // const { data } = req.body;

            await Category.setCategoryData(req.body, category_id);

            res.status(200);
            res.json({ message: "Updated category!!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY updateCategory: " + e);

            next(e);
        }
    }

    async deleteCategory (req, res, next) {
        try {
            const { category_id } = req.params;

            await Category.deleteCategory(category_id);

            res.status(200);
            res.json({ message: "Deleted category!!"});

        } catch (e) {
            // THROW AN API ERROR
            console.log("PIZDA CATEGORY CONTROLLERY deleteCategory: " + e);

            next(e);
        }
    }

}

export default new CategoriesController();