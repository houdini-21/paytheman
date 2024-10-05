import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

interface StockState {
  value: string;
  label: string;
}

const initialState: StockState = {
  value: "MSFT",
  label: "MICROSOFT CORP (MSFT)",
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock: (state, action: PayloadAction<SelectComponentItem>) => {
      state.value = action.payload?.value;
      state.label = action.payload?.label;
    },

    resetStock: (state) => {
      state.value = "";
      state.label = "";
    },
  },
});

export const { setStock, resetStock } = stockSlice.actions;

export default stockSlice.reducer;
