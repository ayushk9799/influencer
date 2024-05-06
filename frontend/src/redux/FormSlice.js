import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  currentStep: 1,
  formData: {},
  loading : false,
  error : ""
};

export const createAccount = createAsyncThunk('form/update-form', async (payload, {getState}) => {
  const {formData} = getState().form;
 console.log(formData)
  const data = await axios.post('http://localhost:3000/addData', formData, {
    withCredentials: true,
  });
  return data;
})

const FromSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      console.log(state.formData)
    },
  },
  extraReducers : (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});
export const { setCurrentStep, updateFormData } = FromSlice.actions;

export default FromSlice.reducer;
  