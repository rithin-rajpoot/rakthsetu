import { createSlice } from '@reduxjs/toolkit'
import { deleteRequestThunk, getUserProfileByIdThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, signupUserThunk } from './userThunk'
import {getLocationName} from '../../../../components/utils/latLongToName'

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    loading: true,
    otherUsers: [],
    activeUserRole: 'donor',
    activeTab: 'requests',
    buttonLoading: false,
    userData: JSON.parse(localStorage.getItem('storeUserData')) || null// used for displaying in map component
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

        builder.addCase(loginUserThunk.fulfilled, (state, action) => { 
            state.userProfile = action.payload?.responseData?.user
            state.isAuthenticated = true;
            state.loading = false;
        });

        builder.addCase(loginUserThunk.rejected, (state, action) => { 
            state.loading = false;
        });


        // Sign up user
        builder.addCase(signupUserThunk.pending, (state, action) => {
            state.loading = true;
            state.buttonLoading = true;
        });

        builder.addCase(signupUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.newUser
            state.isAuthenticated = true;
            state.loading = false;
            state.buttonLoading= false;
        });

        builder.addCase(signupUserThunk.rejected, (state, action) => {
            state.buttonLoading = false;
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

        // get user profile by id
        builder.addCase(getUserProfileByIdThunk.pending, (state, action) => {
        });

        builder.addCase(getUserProfileByIdThunk.fulfilled, (state, action) => {
            const data = action.payload?.responseData;
            localStorage.setItem('storeUserData',JSON.stringify(data))
            state.userData = data
            state.loading = false;
        });

        builder.addCase(getUserProfileByIdThunk.rejected, (state, action) => {
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
            state.activeUserRole = 'donor';
            state.activeTab = 'requests';
        });

        builder.addCase(logoutUserThunk.rejected, (state, action) => {
        });

        // delete blood request
        builder.addCase(deleteRequestThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(deleteRequestThunk.fulfilled, (state, action) => { 
            const deletedId = action.payload;
            state.userProfile.userBloodRequests = state.userProfile.userBloodRequests.filter(
                (request) => request._id !== deletedId)

            state.loading = false;
        });

        builder.addCase(deleteRequestThunk.rejected, (state, action) => { 
            state.loading = false;
        });
    },
})
export const { setActiveUserRole, setActiveTab, setUserLocation } = userSlice.actions;

export default userSlice.reducer