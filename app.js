const express=require("express");
const app=express();
const port=process.env.port || 3000
const placesData=require("./places-list.json");
app.get("/places",(req,res)=>{
    res.json(placesData);
});
app.listen(port);
console.log(`listening on port ${port}`);