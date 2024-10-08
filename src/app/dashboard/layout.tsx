"use client";
import { TopBar, PricesCardComponent } from "@/app/Components";
// import useWebSocket from "@/app/utils/webSocket";

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
  // useWebSocket();
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
