"use client";
import Form from "./Form";
import { useAppSelector } from "@/Store";

const Titles = () => {
  const stockName = useAppSelector((state) => state.stock.label);

  return (
    <div>
      <div className="w-full flex flex-row items-center">
        <div className="w-10/12 mr-5">
          <h2 className="text-3xl font-bold text-white">{stockName}</h2>
          <p className="text-slate-200">+79 00% Today</p>
        </div>
        <div className="w-2/12">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Titles;
