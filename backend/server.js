const express=require('express');
const dotenv=require("dotenv");
const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
 res.send("hello world //")
})
app.listen(PORT,()=>{`console.log(server runing on port ${PORT}`})