
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        authMode: ""
    },
    reducers: {
    
    }
})

export const { } = authSlice.actions

export default authSlice.reducer