import {
  TopBar,
  PricesCardComponent,
  NotificationsComponent,
} from "@/app/Components";

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
  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-white">
      <NotificationsComponent />
      <TopBar items={topBarItems} />
      <div className="flex flex-row">
        <div className="p-2 w-full text-white">{children}</div>
      </div>
      <PricesCardComponent />
    </div>
  );
}
