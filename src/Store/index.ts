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

/**
 * Creates a no-operation storage for environments where window is undefined (e.g., server-side).
 * This prevents errors during SSR (Server-Side Rendering).
 *
 * @returns An object with `getItem`, `setItem`, and `removeItem` methods that return resolved promises.
 */
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

/**
 * Selects the appropriate storage depending on the environment.
 * If `window` is defined, use the browser's local storage; otherwise, use the no-operation storage.
 */
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

/**
 * Configuration for persisting the notification slice in Redux.
 */
const persistNotificationConfig = {
  key: "notification",
  storage,
};

/**
 * Configuration for persisting the card slice in Redux.
 */
const persistCardConfig = {
  key: "card",
  storage,
};

/**
 * Configuration for persisting the stock slice in Redux.
 */
const persistStockConfig = {
  key: "stock",
  storage,
};

/**
 * Persisted reducers for notifications, cards, and stocks.
 * These reducers use the configuration to persist state across sessions.
 */
const persistedNotificationReducer = persistReducer(
  persistNotificationConfig,
  notificationReducer
);
const persistedCardReducer = persistReducer(persistCardConfig, cardReducer);
const persistedStockReducer = persistReducer(persistStockConfig, stockReducer);

/**
 * Creates the Redux store with persisted reducers.
 * Configures middleware to handle actions related to Redux Persist.
 */
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

/**
 * Creates the persistor to persist the Redux store.
 */
export const persistor = persistStore(store);

/**
 * Type for the root state of the Redux store.
 * This helps with TypeScript autocompletion and type-checking when selecting state.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for dispatching actions in the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Hook to use the app's dispatch function in components.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Hook to use the app's selector function with typed state in components.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
