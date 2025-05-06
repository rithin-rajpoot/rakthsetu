import { createSlice } from '@reduxjs/toolkit'
import {io} from 'socket.io-client'

const initialState = {
    socket: null,
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
      initializeSocket: (state, action) =>{
        
        const socket = io(import.meta.env.VITE_DB_ORIGIN,{
          withCredentials: true,
        });
        
        state.socket = socket;
      },

    },
})
export const { initializeSocket } = socketSlice.actions;

export default socketSlice.reducer