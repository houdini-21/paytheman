"use client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { CandlestickChartItem } from "@/app/Components/QuoteChart/interfaces";
import {
  TimeframeButtons,
  CandlestickChart,
  LineChart,
} from "@/app/Components";
import { useStockData } from "./hooks/useChartHook";

export const Chart = () => {
  const [timeframe, setTimeframe] = useState<string>("1D");
  const { isLoading, dataStock, dataLine } = useStockData(timeframe);

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
            baseColor="#3a3a3a"
            highlightColor="#565656"
          />
        )}
        {!isLoading && dataStock?.length > 0 && timeframe !== "live" && (
          <CandlestickChart seriesData={dataStock as CandlestickChartItem[]} />
        )}
        {!isLoading && dataStock?.length > 0 && timeframe === "live" && (
          <LineChart
            seriesData={dataLine?.seriesData as number[]}
            categories={dataLine?.categories as string[]}
          />
        )}
        {!isLoading && !dataStock && (
          <div className="flex justify-center items-center h-[540px] bg-zinc-900 rounded-lg">
            <span className="text-white">No data available</span>
          </div>
        )}
      </div>
    </div>
  );
};
