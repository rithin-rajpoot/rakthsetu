import express from 'express';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js'

// Database connection
import {connectDB} from "./db/dbConnection.js";
connectDB(); 

// integration
import cors from 'cors';
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// routes 

// user routes : 
import userRouter from './routes/userRouter.js';
app.use("/ufb/user", userRouter)

// request routes : 
import bloodRequestRouter from './routes/requestRouter.js';
app.use("/ufb/request", bloodRequestRouter);


// ERROR HANDLING MIDDLEWARE
import { errorMiddleware } from './middlewares/errorMiddleware.js';
app.use(errorMiddleware);


// Start the server 
const port = process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`UFB SERVER LAUNCHED AT :`, port);
})