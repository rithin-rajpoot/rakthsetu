import { io } from "socket.io-client";

let socket = null;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_DB_ORIGIN, {
      withCredentials: true,
      query: { userId },
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};