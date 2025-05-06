import { Server } from 'socket.io'
import http from 'http';
import express from 'express';

// Import environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server,
    {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        }
    }
);

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("disconnect", () =>{
        console.log("Disconnected");
    })
})

export { io, app, server }
