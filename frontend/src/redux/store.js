import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import FormSlice from "./FormSlice";
import UserSlice from "./UserSlice";


export const store = configureStore({
  reducer: {
    form: FormSlice,
    user : UserSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
