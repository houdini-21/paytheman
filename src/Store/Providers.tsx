"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/Store"; // Asegúrate de usar el store con persistencia

interface PropsProvider {
  children: React.ReactNode;
}

export const Providers = ({ children }: PropsProvider) => (
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
