import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import connectDb from './lib/db.js'
import cors from "cors";

import cookieParser from 'cookie-parser'
import { userRoute } from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import path from 'path';


const __dirname= path.resolve();




const app =express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send 
  })
);

app.use(express.json());
app.use(cookieParser());

dotenv.config()


const PORT=process.env.PORT||5000;

app.use(express.json())


app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/chat",chatRoute)

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
  })
}



connectDb();

app.listen(PORT,()=>{
    console.log(`your server is listin on http://localhost:${PORT}`)
})
