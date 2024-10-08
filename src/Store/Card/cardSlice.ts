import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

interface CardStateItem {
  id: number;
  companyName: SelectComponentItem;
  companySymbol: string;
}

interface CardState {
  cards: CardStateItem[];
}

const initialState: CardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardStateItem>) => {
      state.cards.push(action.payload);
    },

    removeCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
