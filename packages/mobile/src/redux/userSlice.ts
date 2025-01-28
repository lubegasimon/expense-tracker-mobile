import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UserState {
  email: string;
}

const initialState: UserState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storedEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
  },
});

export const { storedEmail, clearEmail } = userSlice.actions;
export default userSlice.reducer;
export const selectEmail = (state: RootState) => state.user.email;
