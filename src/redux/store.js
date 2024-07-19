import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./user/authSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})