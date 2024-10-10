import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

/**
 * Interface representing an individual notification item.
 */
interface NotificationStateItem {
  /** Unique identifier for the notification */
  id: number;
  /** Selected company name */
  companyName: SelectComponentItem;
  /** Stock symbol of the selected company */
  companySymbol: string;
  /** The condition for triggering the notification (e.g., "up" or "down") */
  situation: SelectComponentItem;
  /** The price threshold for triggering the notification */
  price: number;
}

/**
 * Interface representing the state for notifications.
 */
interface NotificationState {
  /** Array of notification items currently in the state */
  items: NotificationStateItem[];
}

/**
 * Initial state for the notifications slice, starting with an empty array of notifications.
 */
const initialState: NotificationState = {
  items: [],
};

/**
 * Slice for managing notification-related state. Handles adding and removing notifications.
 */
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    /**
     * Adds a new notification to the state.
     *
     * @param state - The current state of the notifications.
     * @param action - The payload containing the notification to be added.
     */
    addNotification: (state, action: PayloadAction<NotificationStateItem>) => {
      state.items.push(action.payload);
    },

    /**
     * Removes a notification from the state based on its unique ID.
     *
     * @param state - The current state of the notifications.
     * @param action - The payload containing the ID of the notification to be removed.
     */
    removeNotification: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

/** Exports the actions for adding and removing notifications. */
export const { addNotification, removeNotification } =
  notificationSlice.actions;

/** Exports the reducer for managing notification state changes. */
export default notificationSlice.reducer;
