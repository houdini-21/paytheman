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
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-white">
      <TopBar items={topBarItems} />
      <div className="flex flex-row">
        <div className="p-2 w-full text-white">{children}</div>
      </div>
      <PricesCardComponent
        data={[
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
          {
            name: "BTC",
            price: 40000,
            percentage: 2.5,
            change: 1000,
          },
        ]}
      />
    </div>
  );
}
