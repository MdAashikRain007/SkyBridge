import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { connectToSocket } from './constrollers/socketManger.js';
import userRoute from './routes/usersRoutes.js';


const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
// const io = connectToSocket(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/users",userRoute);


const start = async()=>{
    app.set("mono_user")
    const connetionDb = await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log(" ✅ Database is connected successfully");
    }).catch((err)=>{
        console.log(err);
    })
    server.listen(PORT,()=>{
        console.log(`🚀 server running on port ${PORT}`);
    })
    connectToSocket(server);
}




start();






