const { dbConnection } = require('../connecting_database.js');

exports.db_controller = {
    async get_from_db(req, res) {
        try {
            const connection = await dbConnection.createConnection();
            const [rows] = await connection.execute('SELECT * from tbl_14_users');
            connection.end();
            res.json(rows);
        } catch (error) {
            console.error('Error fetching data from database:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    async updatedb(body, user_id) {
        try {
            const connection = await dbConnection.createConnection();
            const query = `
                UPDATE tbl_14_preferences 
                SET 
                    pref_number = ?, 
                    place = ?, 
                    type = ?, 
                    start_date = ?, 
                    end_date = ? 
                WHERE user_id = ?
            `;
            const values = [body.pref_number, body.place, body.type, body.start_date, body.end_date, user_id];
            await connection.execute(query, values);
            connection.end();
            return true;
        } catch (error) {
            console.error('Error updating database:', error);
            return false;
        }
    }
};

    