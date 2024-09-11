import path from "path";
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connecttomongodbfile.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import cookiesParser from 'cookie-parser';
import {app, server} from './socket/socket.js'

const PORT=process.env.PORT || 5000;

const  __dirname=path.resolve();
dotenv.config();
app.use(cookiesParser())
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute)
app.use("/api/user",userRoute)

app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
 res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
 connectToMongoDB();
 console.log(`server runing on port ${PORT}`)
})