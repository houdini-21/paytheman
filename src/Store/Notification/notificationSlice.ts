import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

interface NotificationStateItem {
  id: number;
  companyName: SelectComponentItem;
  situation: SelectComponentItem;
  price: number;
}

interface NotificationState {
  items: NotificationStateItem[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationStateItem>) => {
      state.items.push(action.payload);
    },

    removeNotification: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
