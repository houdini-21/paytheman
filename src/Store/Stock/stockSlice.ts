import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

interface StockState {
  value: string;
  label: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

const initialState: StockState = {
  value: "MSFT",
  label: "MICROSOFT CORP (MSFT)",
  price: 0,
  change: 0,
  changePercent: 0,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStock: (state, action: PayloadAction<SelectComponentItem>) => {
      state.value = action.payload?.value;
      state.label = action.payload?.label;
    },

    setQuoteData: (
      state,
      action: PayloadAction<{
        price: number;
        change: number;
        changePercent: number;
      }>
    ) => {
      state.price = action.payload.price;
      state.change = action.payload.change;
      state.changePercent = action.payload.changePercent;
    },

    resetStock: (state) => {
      state.value = "";
      state.label = "";
    },
  },
});

export const { setStock, resetStock, setQuoteData } = stockSlice.actions;

export default stockSlice.reducer;
