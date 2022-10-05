import client from '../db.js';


class User {

    async addUser(id, login, password, full_name, email, role, token) {
        try {
            // Create an random id for user
            // const id = 1;
            
            const queryText = "INSERT INTO users" + 
            "(id, login, password, full_name, email, role, token) " + 
            "VALUES ($1, $2, $3, $4, $5, $6, $7)";

            // console.log(token);
            if (!full_name) {
                full_name = 'ANONIMUS';
            }
            
            await client.query(queryText, [id, login, password, full_name, email, role, token]);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB addUser: " + e);
        }
    }

    async getUserData(providedDataColumn, providedData) {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM users WHERE " + providedDataColumn + " = $1";
            const res = await client.query(queryText, [providedData]);

            if (res.rowCount === 0) {
                // THROW AN API ERROR
            }
            return res.rows[0];
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB getUserData: " + e);
        }
    }

    async getAllUsers() {
        try {
            // Build a query using requested column
            const queryText = "SELECT * FROM users";
            const res = await client.query(queryText);
            
            return res.rows;
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB getAllUsers: " + e);
        }
    }

    async setUserData(providedDataColumn, providedData, user_id) {
        try {
            // Build a query using requested column
            const queryText = "UPDATE users SET " + providedDataColumn + " = $1 WHERE id = $2";
            const res = await client.query(queryText, [providedData, user_id]);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB setUserData: " + e);
        }
    }

    async setMultipleColumnsUserData(data, user_id) {
        try {
            console.log("data length is: " + Object.keys(data).length);

            let queryText = "UPDATE users SET ";
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
            queryValues.push(user_id);

            console.log(queryText);
            console.log(queryValues);

            // Build a query using requested column
            // const queryText = "UPDATE users SET " + providedDataColumn + " = $1 WHERE id = $2";
            const res = await client.query(queryText, queryValues);
            // console.log(res);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB setMultipleColumnsUserData: " + e);
        }
    }

    async deleteUser(user_id) {
        try {
            // Build a query using requested column
            const queryText = "DELETE FROM users WHERE id = $1";
            const queryValues = [user_id];

            const res = await client.query(queryText, queryValues);
            // console.log(res);
            
        } catch (e) {
            // THROW AN API ERROR
            console.log("USER DB deleteUser: " + e);
        }
    }

}

export default new User();