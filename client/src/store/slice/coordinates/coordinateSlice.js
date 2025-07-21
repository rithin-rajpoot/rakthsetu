import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    buttonLoading: false,
    seekerCoords:{},
    donorCoords:{},
    seekerId: JSON.parse(localStorage.getItem('storeSeekerId')) || null,
}

const coordinateSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        setSeekerCoords: (state, action) => {
            state.seekerCoords = action.payload;
        },

        setDonorCoords: (state, action) => {
            state.donorCoords = action.payload;
        },

        setSeekerId: (state, action) => {
            localStorage.setItem('storeSeekerId',JSON.stringify(action.payload))
            state.seekerId = action.payload;
        },
    },
    
})
export const { setSeekerCoords, setDonorCoords, setSeekerId} = coordinateSlice.actions;

export default coordinateSlice.reducer