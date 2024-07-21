import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./user/authSlice"
import financeReducer from './finance/financeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        finance: financeReducer,
    },
})