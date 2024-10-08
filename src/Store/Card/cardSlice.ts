import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

interface CardStateItem {
  id: number;
  companyName: SelectComponentItem;
  companySymbol: string;
}

interface CardState {
  items: CardStateItem[];
}

const initialState: CardState = {
  items: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardStateItem>) => {
      state.items.push(action.payload);
    },

    removeCard: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
