import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../../../components/utils/axiosInstance.js'


export const loginUserThunk = createAsyncThunk('user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', {
                username,
                password
            });
            toast.success("Login successful")
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const signupUserThunk = createAsyncThunk('user/signup',
    async ({ fullName, username, password, email, phone, location, bloodType }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/signup', {
                fullName,
                username,
                password,
                email,
                phone,
                location,
                bloodType
            });
            toast.success("Account Created Successfully!!");
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
)

export const getUserProfileThunk = createAsyncThunk('user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/get-profile');
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            return rejectWithValue(errorOutput)
        }
    }
);