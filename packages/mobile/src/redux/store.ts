import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseCountReducer from "./expenseCountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expenseCount: expenseCountReducer,
  },
});

type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
