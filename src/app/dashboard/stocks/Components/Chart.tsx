"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/Store";
import { CandlestickChart } from "@/app/Components";
import { CandlestickChartItem } from "@/app/Components/QuoteChart/interfaces";
import { fetchHistoricalData } from "@/app/hooks/getMarketData";
import Skeleton from "react-loading-skeleton";

export const Chart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataStock, setDataStock] = useState<CandlestickChartItem[]>([]);
  const stockValue = useAppSelector((state) => state.stock.value);

  const fetchStockData = async () => {
    setIsLoading(true);
    const data = await fetchHistoricalData({
      symbol: stockValue as string,
      timeframe: "1D",
      start: "2024-08-04T00:00:00Z",
      end: "2024-10-04T23:59:59Z",
    });

    const formattedData = data?.map((item: any) => ({
      x: new Date(item.t).getTime(),
      y: [item.o, item.h, item.l, item.c],
    }));
    setDataStock(formattedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStockData();
  }, [stockValue]);

  return (
    <div className="w-full h-[500px]">
      {
        // @ts-ignore
        isLoading && (
          <Skeleton
            count={1}
            height={500}
            width={"100%"}
            baseColor="#3a3a3a"
            highlightColor="#565656"
          />
        )
      }
      {!isLoading && dataStock?.length > 0 && (
        <CandlestickChart seriesData={dataStock} />
      )}
      {!isLoading && !dataStock && (
        <div className="flex justify-center items-center h-[540px] bg-zinc-900 rounded-lg">
          <span className="text-white">No data available</span>
        </div>
      )}
    </div>
  );
};
