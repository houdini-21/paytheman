import { useEffect } from "react";
import classNames from "classnames";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { usePriceContext } from "./provider";

interface PriceCardItemProps {
  name: string;
  symbol: string;
}

export const PriceCardItem = ({ name, symbol }: PriceCardItemProps) => {
  const { prices, subscribeToSymbol } = usePriceContext();
  const priceData = prices[symbol] || {
    price: null,
    change: null,
    percentage: null,
  };

  useEffect(() => {
    subscribeToSymbol(symbol);
  }, [symbol]);

  return (
    <div className="dark:bg-zinc-900 bg-gray-100 dark:text-white text-slate-800 p-4 rounded-md shadow-md flex lg:flex-row flex-col justify-between items-center w-full mt-8">
      <div className="flex flex-col lg:w-5/12 w-full">
        <span className="text-lg">{name}</span>
        <div
          className={classNames("flex items-center", {
            "text-red-500": priceData.change && priceData.change < 0,
            "text-green-500": priceData.change && priceData.change > 0,
          })}
        >
          <div className="text-md">
            {priceData.change && priceData.change > 0 && (
              <FaArrowUp className="text-green-500 ml-2" />
            )}
            {priceData.change && priceData.change < 0 && (
              <FaArrowDown className="text-red-500 ml-2" />
            )}
            {priceData.change === 0 && (
              <FaArrowRight className="text-gray-500 ml-2" />
            )}
          </div>
          <span className="text-lg ml-2">{priceData.change?.toFixed(2)}</span>
          <span className="text-md ml-2">
            ({priceData.percentage?.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="text-lg font-semibold lg:w-3/12 w-full text-right">
        ${priceData.price?.toFixed(2)}
      </div>
    </div>
  );
};
