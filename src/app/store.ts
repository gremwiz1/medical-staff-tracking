import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "../slices/doctorsSlice";
import nursesReducer from "../slices/nursesSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    nurses: nursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
