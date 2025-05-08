import { createSlice } from '@reduxjs/toolkit'
import { deleteRequestThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, signupUserThunk } from './userThunk'
import { setMatchedDonors } from '../request/requestSlice';

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    loading: true,
    otherUsers: [],
    activeUserRole: 'donor',
    activeTab: 'requests'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUserRole: (state, action) => {
            state.activeUserRole = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },

    },

    extraReducers: (builder) => {
        // Login 
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(loginUserThunk.fulfilled, (state, action) => { // action.payload => contains the data returned from loginUserThunk after fetching 
            state.userProfile = action.payload?.responseData?.user // store the data fetched from backend
            state.isAuthenticated = true;
            state.loading = false;
        });

        builder.addCase(loginUserThunk.rejected, (state, action) => { // action.payload => contains the data returned from rejectWithValue()
            state.loading = false;
        });


        // Sign up user
        builder.addCase(signupUserThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(signupUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.newUser
            state.isAuthenticated = true;
            state.loading = false;
        });

        builder.addCase(signupUserThunk.rejected, (state, action) => {
            state.loading = false;
        });


        // get user profile
        builder.addCase(getUserProfileThunk.pending, (state, action) => {
        });

        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.userProfile = action.payload?.responseData;
            state.loading = false;
        });

        builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.loading = false;
        });

        // Logout
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.userProfile = null;
            state.otherUsers = null;
            state.isAuthenticated = false;
            state.loading = false;
        });

        builder.addCase(logoutUserThunk.rejected, (state, action) => {
        });

        // delete blood request
        builder.addCase(deleteRequestThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(deleteRequestThunk.fulfilled, (state, action) => { // action.payload => contains the data returned from loginUserThunk after fetching 
            const deletedId = action.payload;
            state.userProfile.userBloodRequests = state.userProfile.userBloodRequests.filter(
                (request) => request._id !== deletedId)
        });

        builder.addCase(deleteRequestThunk.rejected, (state, action) => { // action.payload => contains the data returned from rejectWithValue()
            //   console.log(action.payload)
            state.loading = false;
        });
    },
})
export const { setActiveUserRole, setActiveTab } = userSlice.actions;

export default userSlice.reducer