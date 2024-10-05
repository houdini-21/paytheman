"use client";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/Store";
import { setQuoteData } from "@/Store/Stock/stockSlice";
import {
  fetchHistoricalData,
  FetchHistoricalDataProps,
} from "@/app/hooks/getMarketData";
import { CandlestickChart, TimeframeButtons } from "@/app/Components";
import { CandlestickChartItem } from "@/app/Components/QuoteChart/interfaces";

export const Chart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>("1D");
  const [dataStock, setDataStock] = useState<CandlestickChartItem[]>([]);
  const stockValue = useAppSelector((state) => state.stock.value);
  const dispatch = useAppDispatch();

  const getDateRange = (timeframe: string) => {
    const end = moment().subtract(1, "days").endOf("day").toISOString();
    let start;
    let timeframeEp;

    switch (timeframe) {
      case "1D":
        start = moment().subtract(1, "days").startOf("day").toISOString();
        timeframeEp = "1H";
        break;
      case "1W":
        start = moment().subtract(1, "weeks").startOf("day").toISOString();
        timeframeEp = "1H";
        break;
      case "1M":
        start = moment().subtract(1, "months").startOf("day").toISOString();
        timeframeEp = "1D";
        break;
      case "1Y":
        start = moment().subtract(1, "years").startOf("day").toISOString();
        timeframeEp = "1W";
        break;
      default:
        start = moment().subtract(2, "days").startOf("day").toISOString();
        timeframeEp = "1H";
        break;
    }

    return { start, end, timeframeEp };
  };

  const fetchStockData = async (timeframe: string, stockValue: string) => {
    setIsLoading(true);
    const { start, end, timeframeEp } = getDateRange(timeframe);

    const data = await fetchHistoricalData({
      symbol: stockValue as string,
      timeframe: timeframeEp,
      start: start,
      end: end,
    });

    const formattedData = data?.map((item: FetchHistoricalDataProps) => ({
      x: new Date(item.t).getTime(),
      y: [item.o, item.h, item.l, item.c],
    }));

    const first = formattedData[0].y[0];
    const last = formattedData[formattedData.length - 1].y[3];
    const change = last - first;
    const changePercent = (change / first) * 100;

    dispatch(
      setQuoteData({
        price: last,
        change: parseFloat(change.toFixed(2)),
        changePercent: Math.round(changePercent * 100) / 100,
      })
    );
    setDataStock(formattedData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStockData(timeframe, stockValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockValue, timeframe]);

  return (
    <div className="w-full h-[500px]">
      <TimeframeButtons
        active={timeframe}
        setActive={(value) => setTimeframe(value)}
      />
      {isLoading && (
        <Skeleton
          count={1}
          height={500}
          width={"100%"}
          baseColor="#3a3a3a"
          highlightColor="#565656"
        />
      )}
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
