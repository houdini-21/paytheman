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
import stockReducer from "./Stock/stockSlice";
import notificationReducer from "./Notification/notificationSlice";
import cardReducer from "./Card/cardSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistNotificationConfig = {
  key: "notification",
  storage,
};

const persistCardConfig = {
  key: "card",
  storage,
};

const persistStockConfig = {
  key: "stock",
  storage,
};

const persistedNotificationReducer = persistReducer(
  persistNotificationConfig,
  notificationReducer
);
const persistedCardReducer = persistReducer(persistCardConfig, cardReducer);
const persistedStockReducer = persistReducer(persistStockConfig, stockReducer);

export const store = configureStore({
  reducer: {
    stock: persistedStockReducer,
    notification: persistedNotificationReducer,
    card: persistedCardReducer,
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
