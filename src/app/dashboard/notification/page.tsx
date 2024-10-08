"use client";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Store";
import { removeNotification } from "@/Store/Notification/notificationSlice";
import Table from "./Components/Table";
import Form from "./Components/Form";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationPage() {
  const itemsList = useAppSelector((state) => state.notification.items);
  const dispatch = useAppDispatch();

  const onDeleteItem = (id: number) => {
    dispatch(removeNotification(id));
    toast.success("Notification removed successfully!");
  };

  return (
    <div className="flex lg:p-8 h-auto px-4 py-8 w-full">
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
                  tableItems={
                    itemsList.map((item) => ({
                      id: item.id,
                      companyName: item.companyName.label,
                      situation: item.situation.label,
                      price: item.price,
                    })) || []
                  }
                  deleteItem={onDeleteItem}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
