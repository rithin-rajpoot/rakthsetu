import { createSlice } from '@reduxjs/toolkit'
import { getUserProfileThunk, loginUserThunk, signupUserThunk } from './userThunk'

const initialState = {
    isAuthenticated: false,
    userProfile: null,
    loading: true,
    otherUsers: [],
    activeUserRole: 'donor',
    activeTab: 'requests'
    // activeUserRole: JSON.parse(localStorage.getItem('selectedUser')),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUserRole: (state, action) => {
            // localStorage.setItem('selectedUser',JSON.stringify(action.payload))
            state.activeUserRole = action.payload;
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    },
    extraReducers: (builder) => {
        // Login 
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(loginUserThunk.fulfilled, (state, action) => { // action.payload => contains the data returned from loginUserThunk after fetching 
            // console.log(action.payload?.responseData?.user)
            state.userProfile = action.payload?.responseData?.user // store the data fetched from backend
            state.isAuthenticated = true;
            state.loading = false;
        });

        builder.addCase(loginUserThunk.rejected, (state, action) => { // action.payload => contains the data returned from rejectWithValue()
            //   console.log(action.payload)
            state.loading = false;
        });


        // Sign up user
        builder.addCase(signupUserThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(signupUserThunk.fulfilled, (state, action) => {
            // console.log(action.payload?.responseData?.newUser)
            state.userProfile = action.payload?.responseData?.newUser
            state.loading = false;
            state.isAuthenticated = true;
        });

        builder.addCase(signupUserThunk.rejected, (state, action) => {
            state.loading = false;
        });


        // get user profile
        builder.addCase(getUserProfileThunk.pending, (state, action) => {
        });

        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            console.log(action.payload)
            state.userProfile = action.payload?.responseData;
            state.loading = false;
        });

        builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.loading = false;
        });
    },
})
export const { setActiveUserRole, setActiveTab } = userSlice.actions;

export default userSlice.reducer