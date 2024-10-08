"use client";
import { useEffect } from "react";
import { TopBar, PricesCardComponent } from "@/app/Components";

const topBarItems = [
  {
    name: "Dashboard",
    path: "/dashboard/stocks",
  },
  {
    name: "Notifications",
    path: "/dashboard/notification",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registrado con éxito:", registration);
          })
          .catch((error) => {
            console.log("Error en el registro del Service Worker:", error);
          });
      });
    }
  }, []);
  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-white">
      <TopBar items={topBarItems} />
      <div className="flex flex-row">
        <div className="p-2 w-full text-white">{children}</div>
      </div>
      <PricesCardComponent />
    </div>
  );
}
