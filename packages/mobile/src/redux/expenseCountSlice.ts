import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ExpenseCountState {
  expenseCount: number;
}

const initialState: ExpenseCountState = {
  expenseCount: 0,
};

const expenseCountSlice = createSlice({
  name: "expenseCount",
  initialState,
  reducers: {
    incrementExpenseCount: (state) => {
      state.expenseCount++;
    },
    decrementExpenseCount: (state) => {
      state.expenseCount--;
    },
  },
});

export const { incrementExpenseCount, decrementExpenseCount } =
  expenseCountSlice.actions;
export const selectExpenseCount = (state: RootState) =>
  state.expenseCount.expenseCount;
export default expenseCountSlice.reducer;
