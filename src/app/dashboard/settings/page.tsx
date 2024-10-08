"use client";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Store";
import { removeCard } from "@/Store/Card/cardSlice";
import { Form, Table } from "./Components";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const itemsList = useAppSelector((state) => state.card.items);
  const dispatch = useAppDispatch();

  const onDeleteItem = (id: number) => {
    dispatch(removeCard(id));
    toast.success("Notification removed successfully!");
  };

  return (
    <div className="flex lg:p-8 h-auto px-4 py-8 w-full">
      <div className="bg-gray-50 w-full p-8 rounded-lg shadow-lg text-black">
        <div>
          <h3 className="text-2xl font-bold mb-6">Settings</h3>
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Create a price card</p>
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
