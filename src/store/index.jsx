import {createSlice,configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'



const initialState = {
    isLoggedIn:false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        }
    },
});

export const authActions = authSlice.actions



//using redux-persist to save dat i redux after reload
const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers( {
    auth:authSlice.reducer})

const persistedReducer = persistReducer(persistConfig,reducer);

export const store = configureStore({
    reducer : persistedReducer
})