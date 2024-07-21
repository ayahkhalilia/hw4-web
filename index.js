require("dotenv").config();
const express=require("express");
const axios=require("axios");
const mysql=require("mysql2/promise");
const jsonServer=require("json-server");
const server=jsonServer.create();
const router=jsonServer.router("./data/user-preferences.json");
const middlewares=jsonServer.defaults();
server.use(middlewares);
server.use(router);
server.listen(port);
const { bodyParser } = require("json-server");
const { db_controller } = require("../hw4-web/controllers/db_controller.js");
const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
async function connectToDatabase() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}
async function fetchdata(){
    try{
        const response=await axios.get(process.env.API_URL);
        return response.data;
    }catch(error){
        console.error("error fetching",error);
        throw error;
    }
}
async function savedata(data){
    const connection=await connectToDatabase();
    const insertpromises=data.map(user_prefer=>{
        return connection.execute(
            'INSERT INTO tbl_14_preferences (number, place, type, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [item.number, item.place, item.type, item.start_date, item.end_date, item.user_id]
        );
    });
    await Promise.all(insertpromises);
    await connection.end();
}
app.get("/fetch-and-save",async(req,res)=>{
    try{
        const data=await fetchdata();
        await savedata(data);
        res.send("data saved");
    }catch(error){
        console.error("error fetch",error);
        res.status(500).send("server error");
    }
});
app.get("/retrieve-and-print",async(req,res)=>{
    try{
        res.status(200).send(await db_controller.get_from_db);
        const connection=await connectToDatabase();
        const [rows,columes]=await connection.execute("SELECT * FROM tbl_14_preferences");
        await connection.end();
        res.json(rows);
    }catch(error){
        console.error("error in retrieve",error);
        res.status(500).send("server error a");
    }
    
});

/*app.get("/f/:userid",(req,res)=>{
    const {userid=null}=req.params;
    console.log("id is",user_id);
    res.send()
})*/

/*function createdataitem(data){
    const user_prefer=document.createElement("li");
    user_prefer.classList.add("user_preferences");
    const list=`${data.number} ${data.place} ${data.type} ${data.start_date} ${data.end_date} ${data.user_id}`;     
}
function poplist(data){
    const userlist=document.createElement("ul");
    userlist.classList.add("user-preferences");
    for(const i in data){
        const user_in_data=createdataitem(data[i]);
        userlist.appendChild(user_in_data);
    }
}
function getdata(){
    fetch("https://hw4-web.onrender.com/user_preferences")
    .then(response =>response.json())
    .then(data=>console.log(data));
}
getdata(); */

// Endpoint to fetch data from API and save to database
/*app.get('/fetch-and-save', async (req, res) => {
    try {
        
        data.
        res.send('Data saved to the database.');
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        res.status(500).send('Internal Server Error');
    }
});*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});