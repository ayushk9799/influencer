import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import FormSlice from "./FormSlice";
import UserSlice from "./UserSlice";
import FeedSlice from "./FeedSlice";


export const store = configureStore({
  reducer: {
    form: FormSlice,
    user : UserSlice,
    feed : FeedSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
