"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { CandlestickChartItem } from "@/app/Components/QuoteChart/interfaces";
import {
  TimeframeButtons,
  CandlestickChart,
  LineChart,
} from "@/app/Components";
import { useStockData } from "./hooks/useChartHook";
import { marketStatus } from "@/app/hooks/getMarketData";

export const Chart = () => {
  const [timeframe, setTimeframe] = useState<string>("1D");
  const { isLoading, dataStock, dataLine } = useStockData(timeframe);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMarketStatus = async () => {
      const status = await marketStatus();
      console.log(status, "status");
      setIsOpen(true);
    };
    fetchMarketStatus();
  }, []);

  return (
    <div className="w-full h-[500px]">
      <TimeframeButtons
        active={timeframe}
        setActive={(value) => setTimeframe(value)}
      />
      <div className="mt-8 w-full">
        {isLoading && (
          <Skeleton
            count={1}
            height={500}
            width={"100%"}
            baseColor={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "#3a3a3a"
                : "#f3f3f3"
            }
            highlightColor={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "#565656"
                : "#e5e5e5"
            }
          />
        )}
        {!isLoading && dataStock?.length > 0 && timeframe !== "live" && (
          <CandlestickChart seriesData={dataStock as CandlestickChartItem[]} />
        )}
        {!isLoading &&
          dataStock?.length > 0 &&
          timeframe === "live" &&
          (isOpen ? (
            <LineChart
              seriesData={dataLine?.seriesData as number[]}
              categories={dataLine?.categories as string[]}
            />
          ) : (
            <div className="flex justify-center items-center h-[540px] bg-zinc-900 rounded-lg">
              <span className="text-white">Market is closed</span>
            </div>
          ))}
        {!isLoading && !dataStock && (
          <div className="flex justify-center items-center h-[540px] bg-zinc-900 rounded-lg">
            <span className="text-white">No data available</span>
          </div>
        )}
      </div>
    </div>
  );
};
