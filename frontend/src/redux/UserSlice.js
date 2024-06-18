import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../assets/Data";

const initialState = {
    isAuthenticated : false,
    userDetails : {},
    orders : [],
    isLoading:true,
}

export const getUserData = createAsyncThunk('user/get-data', async () => {
    const response = await fetch(`${BACKEND_URL}/api/user/getMyData`, {
        credentials: "include",
    });
    const { userDetails } = await response.json();
    return userDetails;
});

export const getOrder = createAsyncThunk('user/get-orders', async () => {
    const response = await fetch(`${BACKEND_URL}/api/user/orders`, {
        credentials: "include",
    });
    const { orders } = await response.json();
    return orders;
});

// for checking which form data is changed and update that value to form-data
// export const updateForm = createAsyncThunk('user/update-form', (payload, {getState, dispatch}) => {
//     const {userDetails} = getState().user;
   
// })

const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUserData : (state, action) => {
            state.userDetails = action.payload;
            state.isAuthenticated = true;
        },
        updateUserDetails : (state, action) => {
            state.userDetails = {...state.userDetails, ...action.payload}
        },
        logout:(state,action)=>
        {
            state.isAuthenticated=false;
            state.userDetails={};
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
          },
        
    },
    extraReducers : (builder) => {
        builder
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userDetails = action.payload.userDetails;
                state.isAuthenticated = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
    }
})

export const {setUserData, updateUserDetails,logout,setLoading} = UserSlice.actions;

export default UserSlice.reducer;