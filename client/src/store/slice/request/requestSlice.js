import { createSlice } from '@reduxjs/toolkit'
import { createBloodRequestThunk, getAllRequestsThunk } from './requestThunk';

const initialState = {
    matchedDonors: [],
    loading: false,
    allRequests: []
}

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        updateRequests : (state, action) => {
            const oldRequests = state.allRequests;
            state.allRequests = [...oldRequests, action.payload];
        }
    },
    extraReducers: (builder) => {
        // create blood request
        builder.addCase(createBloodRequestThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(createBloodRequestThunk.fulfilled, (state, action) => { // action.payload => contains the data returned from loginUserThunk after fetching 
            state.matchedDonors = action.payload?.responseData?.matchedDonors;

            state.loading = false;
        });

        builder.addCase(createBloodRequestThunk.rejected, (state, action) => { // action.payload => contains the data returned from rejectWithValue()
            //   console.log(action.payload)
            state.loading = false;
        });

        // get all blood requests
        builder.addCase(getAllRequestsThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllRequestsThunk.fulfilled, (state, action) => { // action.payload => contains the data returned from loginUserThunk after fetching 
            // console.log(action.payload);
            state.allRequests = action.payload?.responseData?.nearestRequests;

            state.loading = false;
        });

        builder.addCase(getAllRequestsThunk.rejected, (state, action) => { // action.payload => contains the data returned from rejectWithValue()
            //   console.log(action.payload)
            state.loading = false;
        });
    },
})
export const { updateRequests } = requestSlice.actions;

export default requestSlice.reducer