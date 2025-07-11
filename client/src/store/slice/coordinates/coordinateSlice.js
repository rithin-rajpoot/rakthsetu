import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    buttonLoading: false,
    seekerCoords:{},
    donorCoords:{},
}

const coordinateSlice = createSlice({
    name: 'coordinates',
    initialState,
    reducers: {
        setSeekerCoords: (state, action) => {
            // action.payload = { seekerId: { lat: 0, lng: 0 } }
           console.log("Setting seeker coordinates:", action.payload);
            state.seekerCoords = action.payload;
        },

        setDonorCoords: (state, action) => {
            console.log("Setting donor coordinates:", action.payload);
            state.donorCoords = action.payload;
        },
    },
    
})
export const { setSeekerCoords, setDonorCoords } = coordinateSlice.actions;

export default coordinateSlice.reducer