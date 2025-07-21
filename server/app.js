import express from 'express';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js'

// Database connection
import {connectDB} from "./db/dbConnection.js";
connectDB(); 

// integration
import cors from 'cors';
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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