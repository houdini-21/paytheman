"use client";
import Table from "./Components/Table";
import Form from "./Components/Form";

export default function NotificationPage() {
  return (
    <div className="flex gap-8 p-8 h-[600px]">
      <div className="bg-gray-50 w-full p-8 rounded-lg shadow-lg text-black">
        <div>
          <h3 className="text-2xl font-bold mb-6">Notifications</h3>
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">
                Create Stock Notifications
              </p>
              <div className="w-full">
                <Form />
              </div>
              <hr className="my-8" />
              <div className="flex flex-col">
                <p className="text-lg">Active Notifications</p>
                <Table
                  tableItems={[
                    { id: 1, companyName: "Apple", situation: "Price goes up" },
                    {
                      id: 2,
                      companyName: "Tesla",
                      situation: "Price goes down",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
