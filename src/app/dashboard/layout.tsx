"use client";
import { useEffect } from "react";
import { TopBar } from "@/app/Components";

const topBarItems = [
  {
    name: "Dashboard",
    path: "/dashboard/stocks",
  },
  {
    name: "Notifications",
    path: "/dashboard/notification",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Permiso de notificación concedido.");
      } else {
        console.log("Permiso de notificación denegado.");
      }
    });
  }, []);
  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-white">
      <TopBar items={topBarItems} />
      <div className="flex flex-row">
        <div className="p-2 w-full text-white">{children}</div>
      </div>
    </div>
  );
}
