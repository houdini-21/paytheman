import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

/**
 * Interface representing an individual card state item.
 */
interface CardStateItem {
  /** Unique identifier for the card */
  id: number;
  /** The selected company name */
  companyName: SelectComponentItem;
  /** The stock symbol of the company */
  companySymbol: string;
}

/**
 * Interface representing the state for the collection of cards.
 */
interface CardState {
  /** Array of cards currently in the state */
  cards: CardStateItem[];
}

/**
 * Initial state for the cards slice, starting with an empty array of cards.
 */
const initialState: CardState = {
  cards: [],
};

/**
 * Slice for managing the card-related state. Handles adding and removing cards.
 */
const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    /**
     * Adds a new card to the state.
     *
     * @param state - The current state of the cards.
     * @param action - The payload containing the card to be added.
     */
    addCard: (state, action: PayloadAction<CardStateItem>) => {
      state.cards.push(action.payload);
    },

    /**
     * Removes a card from the state based on the card's unique ID.
     *
     * @param state - The current state of the cards.
     * @param action - The payload containing the ID of the card to be removed.
     */
    removeCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((item) => item.id !== action.payload);
    },
  },
});

/** Exports the actions for adding and removing cards. */
export const { addCard, removeCard } = cardSlice.actions;

/** Exports the reducer for managing card state changes. */
export default cardSlice.reducer;
