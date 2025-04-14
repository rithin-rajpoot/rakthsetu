import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../../../components/utils/axiosInstance.js'


export const createBloodRequestThunk = createAsyncThunk('request/createBloodRequest',
    async ({ fullName, location, urgency, bloodType }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/request/create-blood-request', {
                fullName, location, urgency, bloodType
            });
            toast.success("Blood request created successfully")
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            // console.log(errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const getAllRequestsThunk = createAsyncThunk('request/getAllRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/request/get-all-requests');
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            // console.log(errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);