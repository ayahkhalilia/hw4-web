require("dotenv").config();
const mysql = require('mysql2/promise');

    async function resivedata() {
        
        try{
            const connection = await mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        });
        const [rows,columes]=await connection.execute("select * from tbl_14_preferences");
        console.log("data resived");
        console.log(rows);
        await connection.end();
        }catch(error){
            console.error("error ",error);
        }
    }
resivedata();