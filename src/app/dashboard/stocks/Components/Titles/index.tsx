"use client";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";
import classNames from "classnames";
import { useAppSelector } from "@/Store";
import useFinnhubWebSocket from "@/app/utils/finnhubWebSocket";
import { Form } from "../Form";

export const Titles = () => {
  const stockName = useAppSelector((state) => state.stock.label);
  const stockValue = useAppSelector((state) => state.stock.value);
  const quoteDataPrice = useAppSelector((state) => state.stock.price) || 0;
  const quoteDataChange = useAppSelector((state) => state.stock.change) || 0;
  const quoteDataChangePercent =
    useAppSelector((state) => state.stock.changePercent) || 0;
  const notificationList = useAppSelector((state) => state.notification.items);
  useFinnhubWebSocket(stockValue, notificationList);

  return (
    <div>
      <div className="w-full flex lg:flex-row flex-col items-center">
        <div className="lg:w-10/12 lg:mr-5 w-full">
          <h2 className="text-3xl font-bold text-white">{stockName}</h2>
          <div className="flex flex-col">
            <p
              className={classNames("text-2xl", {
                "text-green-500": quoteDataChange > 0,
                "text-red-500": quoteDataChange < 0,
              })}
            >
              {quoteDataPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="flex flex-row items-center">
              <p
                className={classNames("text-xl flex items-center", {
                  "text-green-500": quoteDataChange > 0,
                  "text-red-500": quoteDataChange < 0,
                })}
              >
                {quoteDataChange} ({Math.abs(quoteDataChangePercent).toFixed(2)}
                %)
              </p>

              {quoteDataChange > 0 && (
                <FaArrowUp className="text-green-500 ml-2" />
              )}

              {quoteDataChange < 0 && (
                <FaArrowDown className="text-red-500 ml-2" />
              )}

              {quoteDataChange === 0 && (
                <FaArrowRight className="text-gray-500 ml-2" />
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-2/12 w-full">
          <Form />
        </div>
      </div>
    </div>
  );
};
