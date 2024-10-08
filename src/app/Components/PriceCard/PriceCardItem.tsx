import { useEffect, useState } from "react";
import classNames from "classnames";
import { FaArrowDown, FaArrowRight, FaArrowUp } from "react-icons/fa";

interface PriceCardItemProps {
  name: string;
  symbol: string;
}

export const PriceCardItem = ({ name, symbol }: PriceCardItemProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );
    let lastTimestamp = 0;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "subscribe",
          symbol,
        })
      );
    };

    ws.onmessage = async (e) => {
      const data = JSON.parse(e.data);
      const trade = data.type === "trade" ? data.data[0] : null;

      if (trade && trade.t - lastTimestamp >= 10000) {
        lastTimestamp = trade.t;
        const newPrice = trade.p;

        const responseQuote = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
        );
        const quote = await responseQuote.json();
        const newChange = newPrice - quote.c;
        const newPercentage = ((newPrice - quote.c) / quote.c) * 100;
        setPrice(newPrice);
        setChange(newChange);
        setPercentage(newPercentage);
      }
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return (
    <div className="dark:bg-zinc-900 bg-gray-100 dark:text-white text-slate-800 p-4 rounded-md shadow-md flex lg:flex-row flex-col justify-between items-center w-full mt-8">
      <div className="flex flex-col lg:w-3/12 w-full">
        <span className="text-lg">{name}</span>
        <div
          className={classNames("flex items-center", {
            "text-red-500": change && change < 0,
            "text-green-500": change && change > 0,
          })}
        >
          <div className="text-md">
            {change && change > 0 && (
              <FaArrowUp className="text-green-500 ml-2" />
            )}
            {change && change < 0 && (
              <FaArrowDown className="text-red-500 ml-2" />
            )}
            {change === 0 && <FaArrowRight className="text-gray-500 ml-2" />}
          </div>
          <span className="text-lg ml-2">{change?.toFixed(2)}</span>
          <span className="text-md ml-2">({percentage?.toFixed(2)}%)</span>
        </div>
      </div>
      <div className="text-lg font-semibold lg:w-3/12 w-full text-right">
        ${price?.toFixed(2)}
      </div>
    </div>
  );
};
