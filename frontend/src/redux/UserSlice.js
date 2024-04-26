import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    userDetails : {}
}

export const getUserData = createAsyncThunk('user/get-data', async () => {
    const response = await fetch("http://localhost:3000/getMyData", {
        credentials: "include",
    });
    const { userDetails } = await response.json();
    return userDetails;
})

const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUserData : (state, action) => {
            state.userDetails = action.payload;
            state.isAuthenticated = true;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userDetails = action.payload.userDetails;
                state.isAuthenticated = true;
            })
    }
})

export const {setUserData} = UserSlice.actions;

export default UserSlice.reducer;