import dashBoardRouter from "./routes/dashboardRoute.js";
import express from "express"
import path from "path"
import cors from "cors"
import authRouter from "./routes/authRoute.js"
import incomeRouter from './routes/incomeRoute.js'
import expenseRouter from './routes/expenseRoute.js'

import { fileURLToPath } from 'url';

// recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js"
connectDB();



const app = express();
const PORT = process.env.PORT || 5000;


//middleware for handling cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.option("*", cors())

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/dashboard",dashBoardRouter)
app.use("/api/income",incomeRouter)
app.use("/api/expense",expenseRouter)


//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname,"uploads")));



app.get('/',(req,res)=>{
    res.send("Backend is running")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}....`)
})