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

const activeUsers = new Map();

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;
    // console.log("User ID:", userId);
    if (userId) {
        activeUsers.set(userId, socket.id);
    }

    socket.on('donor-responded', ({ seekerId, donorLocation, seekerLocation, userId }) => {
    const seekerSocketId = activeUsers.get(seekerId);
    if (seekerSocketId) {
      io.to(seekerSocketId).emit('show-map', {donorLocation, seekerLocation, seekerId, donorId:userId}); // Emit donor location to seeker
    }
  });

    socket.on("disconnect", () =>{
        console.log("Disconnected");
    })
})

export { io, app, server }
