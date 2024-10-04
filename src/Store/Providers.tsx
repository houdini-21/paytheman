"use client";
import { Provider } from "react-redux";
import { store } from "@/Store";

interface PropsProvider {
  children: React.ReactNode;
}

export const Providers = ({ children }: PropsProvider) => (
  <Provider store={store}>{children}</Provider>
);
