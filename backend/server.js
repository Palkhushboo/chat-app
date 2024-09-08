
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connecttomongodbfile.js";
import messageRoute from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import cookiesParser from 'cookie-parser';
import {app, server} from './socket/socket.js'

const PORT=process.env.PORT || 5000;

dotenv.config();
app.use(cookiesParser())
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute)
app.use("/api/user",userRoute)

server.listen(PORT,()=>{
 connectToMongoDB();
 console.log(`server runing on port ${PORT}`)
})