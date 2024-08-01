import { combineReducers, configureStore } from '@reduxjs/toolkit'
import financeReducer from './finance/financeSlice'
import userReducer from './user/userSlice'
// set up to save  user to localStorage
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

// set up to save  user to localStorage
const rootReducer = combineReducers({user: userReducer, finance: financeReducer})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// normal store configure

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddlWare) => getDefaultMiddlWare({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store)