import mongoose from "mongoose"
import dotenv from "dotenv"

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{});
        console.log("MongoDb Connected");
    } catch (error) {
        console.error("Database Connection failed!!",error);
        process.exit(1);
        
    }
}


export default connectDB;