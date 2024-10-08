import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import stockReducer from "./Stock/stockSlice";
import notificationReducer from "./Notification/notificationSlice";
import cardReducer from "./Card/cardSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedStockReducer = persistReducer(persistConfig, stockReducer);
const persistedNotificationReducer = persistReducer(
  persistConfig,
  notificationReducer
);

export const store = configureStore({
  reducer: {
    stock: persistedStockReducer,
    notification: persistedNotificationReducer,
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
