import classNames from "classnames";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { PricesCardProps } from "./interfaces";

export const PriceCardItem = ({
  name,
  price,
  percentage,
  change,
}: PricesCardProps) => {
  return (
    <div className="bg-zinc-900 text-white p-6 rounded-md shadow-md flex justify-between items-center w-full">
      <div className="flex flex-col w-3/12">
        <span className="text-xl">{name}</span>
        <div
          className={classNames("flex items-center", {
            "text-red-500": change < 0,
            "text-green-500": change > 0,
          })}
        >
          <div className="text-md">
            {change > 0 && <FaArrowUp className="text-green-500 ml-2" />}

            {change < 0 && <FaArrowDown className="text-red-500 ml-2" />}

            {change === 0 && <FaArrowRight className="text-gray-500 ml-2" />}
          </div>
          <span className="text-lg ml-2">{change}</span>
          <span className="text-md ml-2">({percentage}%)</span>
        </div>
      </div>
      <div className="text-lg font-semibold w-3/12 text-right">${price}</div>
    </div>
  );
};
