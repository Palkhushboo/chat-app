import mongoose from "mongoose";
const connectToMongoDB=async ()=>{
 try {
   await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    connectTimeoutMS: 30000});
   console.log("connected to mongodb");
 } catch (error) {
   console.log("error connecting to mongodb",error.message)
 }
}

export default connectToMongoDB;