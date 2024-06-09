import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { updateUserDetails } from "./UserSlice";
import { BACKEND_URL } from "../assets/Data";

const initialState = {
  currentStep: 1,
  formData: {},
  loading: false,
  error: "",
};

export const createAccount = createAsyncThunk(
  "form/update-form",
  async (payload, { getState, dispatch }) => {
    const { formData } = getState().form;
    const {data} = await axios.post(`${BACKEND_URL}/addData`, formData, {
      withCredentials: true,
    });
    dispatch(updateUserDetails(data.data));
    return data;
  }
);

const FromSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStep = 1;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setCurrentStep, updateFormData } = FromSlice.actions;

export default FromSlice.reducer;
