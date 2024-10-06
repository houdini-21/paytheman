"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/Store";
import { LoadingScreen } from "@/app/Components";

interface PropsProvider {
  children: React.ReactNode;
  loadingScreen?: React.ReactNode;
}

export const Providers = ({ children }: PropsProvider) => (
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
