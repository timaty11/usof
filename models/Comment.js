import { v4 as uuidv4 } from 'uuid';

import client from '../db.js';


class Comment {

    async addComment(data) {
        try {
            // Create an random id for comment
            const id = uuidv4();
            
            const queryText = "INSERT INTO comments"+ 
            "(id, author_id, post_id, publish_date, content) " + 
            "VALUES ($1, $2, $3, $4, $5)";

            const publish_date = new Date();

            const queryValues = [id, data.author_id, data.post_id, publish_date, data.content];
            
            return await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("COMMENTS DB addComment: " + e);
        }
    }

    async getCommentData(providedDataColumn, providedData) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM categories WHERE " + providedDataColumn + " = $1";
            const queryValues = [providedData];

            const res = await client.query(queryText, queryValues);

            if (res.rowCount === 0) {
                // THROW AN API ERROR
            }
            return res.rows[0];

        } catch (e) {
            // THROW AN API ERROR
            console.log("COMMENTS DB getCommentData: " + e);
        }
    }

    async getAllCommentsForPost(post_id) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM comments WHERE post_id = $1";
            const queryValues = [post_id];
            const data = await client.query(queryText, queryValues);

            return data.rows;
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("COMMENTS DB getAllPosts: " + e);
        }
    }

    async setCommentData(data, comment_id) {
        try {
            // Build a query using requested column
            const queryText = "UPDATE comments SET " + Object.keys(data)[0] + " = $1 WHERE id = $2";
            const queryValues = [data[Object.keys(data)[0]], comment_id]

            const res = await client.query(queryText, queryValues);

            if (res.rowCount === 0) {
                // THROW AN API ERROR
            }
            return res.rows[0];
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("COMMENT DB setCommentData: " + e);
        }
    }

    async deleteComment(comment_id) {
        try {
            // Build a query using requested column
            const queryText = "DELETE FROM comments WHERE id = $1";
            const queryValues = [comment_id];

            const res = await client.query(queryText, queryValues);
            // console.log(res);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("COMMENT DB deleteComment: " + e);
        }
    }

}

export default new Comment();