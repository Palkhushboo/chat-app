
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connecttomongodbfile.js";
import messageRoute from "./routes/message.routes.js";

const app=express();
const PORT=process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute)

app.listen(PORT,()=>{
 connectToMongoDB();
 console.log(`server runing on port ${PORT}`)
})