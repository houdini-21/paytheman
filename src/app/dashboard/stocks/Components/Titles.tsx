"use client";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import classNames from "classnames";
import { useAppSelector } from "@/Store";
import { getQuoteData } from "@/app/hooks/getMarketData";
import Form from "./Form";

interface TitlesProps {
  price: number;
  change: number;
  changePercent: number;
}

const Titles = () => {
  const [quoteData, setQuoteData] = useState<TitlesProps>({
    price: 0,
    change: 0,
    changePercent: 0,
  });
  const stockName = useAppSelector((state) => state.stock.label);
  const stockValue = useAppSelector((state) => state.stock.value);

  useEffect(() => {
    const fetchQuoteData = async () => {
      const quoteData = await getQuoteData(stockValue);
      setQuoteData({
        price: quoteData.c,
        change: quoteData.d,
        changePercent: quoteData.dp,
      });
    };

    fetchQuoteData();
  }, [stockValue]);

  return (
    <div>
      <div className="w-full flex flex-row items-center">
        <div className="w-10/12 mr-5">
          <h2 className="text-3xl font-bold text-white">{stockName}</h2>
          <div className="flex flex-col">
            <p
              className={classNames("text-2xl", {
                "text-green-500": quoteData.change > 0,
                "text-red-500": quoteData.change < 0,
              })}
            >
              {quoteData.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="flex flex-row items-center">
              <p
                className={classNames("text-xl flex items-center", {
                  "text-green-500": quoteData.change > 0,
                  "text-red-500": quoteData.change < 0,
                })}
              >
                {quoteData.change} (
                {Math.abs(quoteData.changePercent).toFixed(2)}
                %)
              </p>
              {quoteData.change > 0 ? (
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
