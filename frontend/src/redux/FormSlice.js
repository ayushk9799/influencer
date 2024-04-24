import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
  currentStep: 1,
  formData: {},
};

export const createAccount = createAsyncThunk('form/create-account', async (payload, {getState}) => {
  const {formData} = getState().form;

  const data = await axios.post('http://localhost:3001/create-account', {...formData})
  console.log(data);
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
      .addCase(createAccount.fulfilled, state => {
        console.log('success');
      })
      .addCase(createAccount.rejected, (state, action) => {
        console.log(action.payload);
      })
  }
});
export const { setCurrentStep, updateFormData } = FromSlice.actions;

export default FromSlice.reducer;
