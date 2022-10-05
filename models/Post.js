import { v4 as uuidv4 } from 'uuid';

import client from '../db.js';


class Post {

    async addPost(data) {
        try {
            // Create an random id for post
            const id = uuidv4();
            
            const queryText = "INSERT INTO posts"+ 
            "(id, author_id, title, categories_id, publish_date, status, content) " + 
            "VALUES ($1, $2, $3, $4, $5, $6, $7)";

            const curDate =  new Date();

            const queryValues = [
                id,
                data.author_id,
                data.title,
                data.categories_id,
                curDate,
                true,
                data.content
            ]
            
            await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB addPost: " + e);
        }
    }

    async getPostData(providedDataColumn, providedData) {
        try {
            // Build a query using requested column
            let res;
            if (providedDataColumn === "categories_id") {
                const queryText = "SELECT * FROM posts WHERE categories_id && ARRAY['" + providedData + "']";
                // console.log(queryText);

                res = await client.query(queryText);
            } else {
                const queryText = "SELECT * FROM posts WHERE " + providedDataColumn + " = $1";
                res = await client.query(queryText, [providedData]);
            }

            if (res.rowCount === 0) {
                
                // THROW AN API ERROR
            }

            //// NELZYA USAT [0] IBO NADO DLYA getAllPostsForCategory !!!
            return res.rows;
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB getPostData: " + e);
        }
    }

    async getAllPosts() {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM posts";
            const data = await client.query(queryText);

            // console.log(data.rows);
            return data.rows;
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB getAllPosts: " + e);
        }
    }

    async setMultipleColumnsPostData(data, post_id) {
        try {
            console.log("data length is: " + Object.keys(data).length);

            let queryText = "UPDATE posts SET ";
            let queryValues = [];
            let i = 1;
            for (let column in data) {
                queryText = queryText.concat(column);
                queryText = queryText.concat(" = $");
                queryText = queryText.concat(i);
                queryValues.push(data[column]);

                if (i === Object.keys(data).length) {
                    queryText = queryText.concat(" ");
                } else {
                    queryText = queryText.concat(", ");
                }

                i++;
            }
            queryText = queryText.concat("WHERE id = $");
            queryText = queryText.concat(i);
            queryValues.push(post_id);

            console.log(queryText);
            console.log(queryValues);

            const res = await client.query(queryText, queryValues);
            console.log(res);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB setMultipleColumnsPostData: " + e);
        }
    }

    async deletePost(post_id) {
        try {
            // Build a query using requested column
            const queryText = "DELETE FROM posts WHERE id = $1";
            const queryValues = [post_id];

            const res = await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB getAllPosts: " + e);
        }
    }

}

export default new Post();