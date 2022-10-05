import { v4 as uuidv4 } from 'uuid';

import client from '../db.js';


class Category {

    async addCategory(data) {
        try {
            // Create an random id for comment
            const id = uuidv4();
            
            const queryText = "INSERT INTO categories"+ 
            "(id, title, description) " + 
            "VALUES ($1, $2, $3)";

            const queryValues = [id, data.title, data.description];
            
            return await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB addCategory: " + e);
        }
    }

    async getAllCategories() {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM categories";
            const data = await client.query(queryText);

            return data.rows;
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB getAllCategories: " + e);
        }
    }

    async getAllCategoriesForPost(post_id) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM categories WHERE post_id = $1";
            const queryValues = [post_id];
            const data = await client.query(queryText, queryValues);

            return data.rows;
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB getAllCategoriesForPost: " + e);
        }
    }

    async getCategoryData(providedDataColumn, providedData) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM categories WHERE " + providedDataColumn + " = $1";
            const res = await client.query(queryText, [providedData]);

            if (res.rowCount === 0) {
                // THROW AN API ERROR
            }
            return res.rows[0];
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB getCategoryData: " + e);
        }
    }

    async setCategoryData(data, category_id) {
        try {
            // Build a query using requested column
            const queryText = "UPDATE categories SET " + Object.keys(data)[0] + " = $1 WHERE id = $2";
            const queryValues = [data[Object.keys(data)[0]], category_id]

            const res = await client.query(queryText, queryValues);

            if (res.rowCount === 0) {
                // THROW AN API ERROR
            }
            return res.rows[0];
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB setCategoryData: " + e);
        }
    }

    async deleteCategory(category_id) {
        try {
            // Build a query using requested column
            const queryText = "DELETE FROM categories WHERE id = $1";
            const queryValues = [category_id];

            const res = await client.query(queryText, queryValues);
            // console.log(res);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB deleteCategory: " + e);
        }
    }

}

export default new Category();