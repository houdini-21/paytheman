"use client";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import classNames from "classnames";
import { useAppSelector } from "@/Store";
import Form from "./Form";

interface TitlesProps {
  price: number;
  change: number;
  changePercent: number;
}

const Titles = () => {
  const stockName = useAppSelector((state) => state.stock.label);
  const quoteDataPrice = useAppSelector((state) => state.stock.price) || 0;
  const quoteDataChange = useAppSelector((state) => state.stock.change) || 0;
  const quoteDataChangePercent =
    useAppSelector((state) => state.stock.changePercent) || 0;

  return (
    <div>
      <div className="w-full flex flex-row items-center">
        <div className="w-10/12 mr-5">
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
              {quoteDataChange > 0 ? (
                <FaArrowUp className="text-green-500 ml-2" />
              ) : (
                <FaArrowDown className="text-red-500 ml-2" />
              )}
            </div>
          </div>
        </div>
        <div className="w-2/12">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Titles;
