import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import FormSlice from "./FormSlice";

export const store = configureStore({
  reducer: {
    form: FormSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
