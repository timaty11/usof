import { v4 as uuidv4 } from 'uuid';

import client from '../db.js';


class Like {

    async addLike(data) {
        try {
            // Create an random id for comment
            const id = uuidv4();
            
            const queryText = "INSERT INTO like_post"+ 
            "(id, author_id, entity_id, type) " + 
            "VALUES ($1, $2, $3, $4)";

            const queryValues = [id, data.author_id, data.entity_id, data.type];
            
            return await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB addLike: " + e);
        }
    }

    async getLikeData(providedDataColumn, providedData) {
        try {
            console.log("DB CATEGORIES SHLET WAS NAHYI!");
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB getLikeData: " + e);
        }
    }

    async getAllLikesForEntity(entity_id) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM like_post WHERE entity_id = $1";
            const queryValues = [entity_id];
            const data = await client.query(queryText, queryValues);

            return data.rows;
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("CATEGORIES DB getAllLikesForPost: " + e);
        }
    }

    async deleteLike(entity_id) {
        try {
            // Build a query using requested column
            const queryText = "DELETE FROM like_post WHERE entity_id = $1";
            const queryValues = [entity_id];

            const res = await client.query(queryText, queryValues);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("POST DB getAllPosts: " + e);
        }
    }

}

export default new Like();