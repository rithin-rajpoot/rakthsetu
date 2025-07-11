import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userSlice.js' 
import requestReducer from './slice/request/requestSlice.js'
import socketReducer from './slice/socket/socketSlice.js';
import coordinatesReducer from './slice/coordinates/coordinateSlice.js'


export const store = configureStore({
    reducer: {
        userReducer,
        requestReducer,
        socketReducer,
        coordinatesReducer
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["socketReducer.socket"]
            },
        })
    ),
})