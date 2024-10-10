import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

/**
 * Interface representing the state for a selected stock.
 */
interface StockState {
  /** The stock symbol (e.g., "MSFT") */
  value: string;
  /** The label describing the stock (e.g., "MICROSOFT CORP (MSFT)") */
  label: string;
  /** Optional current stock price */
  price?: number;
  /** Optional change in stock price */
  change?: number;
  /** Optional percentage change in stock price */
  changePercent?: number;
}

/**
 * Initial state for the stock slice, defaulting to Microsoft stock.
 */
const initialState: StockState = {
  value: "MSFT",
  label: "MICROSOFT CORP (MSFT)",
  price: 0,
  change: 0,
  changePercent: 0,
};

/**
 * Slice for managing stock-related state, including selected stock and quote data.
 */
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    /**
     * Sets the selected stock in the state.
     *
     * @param state - The current stock state.
     * @param action - The payload containing the stock value and label to set.
     */
    setStock: (state, action: PayloadAction<SelectComponentItem>) => {
      state.value = action.payload?.value;
      state.label = action.payload?.label;
    },

    /**
     * Updates the stock price, price change, and percentage change in the state.
     *
     * @param state - The current stock state.
     * @param action - The payload containing price, change, and percentage change.
     */
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

    /**
     * Resets the stock selection by clearing the value and label.
     *
     * @param state - The current stock state.
     */
    resetStock: (state) => {
      state.value = "";
      state.label = "";
    },
  },
});

/** Exports the actions for setting and resetting stock data and updating quote data. */
export const { setStock, resetStock, setQuoteData } = stockSlice.actions;

/** Exports the reducer for managing stock state changes. */
export default stockSlice.reducer;
