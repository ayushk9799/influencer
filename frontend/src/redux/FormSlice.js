import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  currentStep: 1,
  formData: {},
  loading : false,
  error : ""
};

export const createAccount = createAsyncThunk('form/create-account', async (payload, {getState}) => {
  const {formData} = getState().form;
  const temp = { ...formData, "profile": formData?.images?.profile, "gallery": formData?.images?.cover}
  delete temp.images;
  // console.log(temp);
  const data = await axios.post('http://localhost:3000/addData', temp, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Added Accept header
    }
  });
  // console.log(data);
  return data;
})

export const FromSlice = createSlice({
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
  extraReducers : (builder) => {
    builder
      .addCase(createAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        console.log('redux', action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload.error;
        console.log('error', action);
      })
  }
});
export const { setCurrentStep, updateFormData } = FromSlice.actions;

export default FromSlice.reducer;
  