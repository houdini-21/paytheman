import { useState, useEffect } from "react";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/Store";
import { setQuoteData } from "@/Store/Stock/stockSlice";
import {
  fetchHistoricalData,
  FetchHistoricalDataProps,
} from "@/app/hooks/getMarketData";
import {
  CandlestickChartItem,
  LineChartProps,
} from "@/app/Components/QuoteChart/interfaces";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

const getDateRange = (timeframe: string) => {
  let start, end, timeframeEp;

  switch (timeframe) {
    case "1D":
      const today = moment().day();
      if (today === 6 || today === 0) {
        start = moment()
          .subtract(today === 6 ? 1 : 2, "days")
          .startOf("day")
          .format();
        end = moment()
          .subtract(today === 6 ? 1 : 2, "days")
          .endOf("day")
          .format();
      } else if (today === 1) {
        start = moment().subtract(3, "days").startOf("day").format();
        end = moment().subtract(3, "days").endOf("day").format();
      } else {
        start = moment().subtract(1, "days").startOf("day").format();
        end = moment().subtract(1, "days").endOf("day").format();
      }
      timeframeEp = "1H";
      break;
    case "1W":
      start = moment().subtract(1, "weeks").startOf("day").format();
      end = moment().subtract(2, "days").endOf("day").format();
      timeframeEp = "1H";
      break;
    case "1M":
      start = moment().subtract(1, "months").startOf("day").format();
      end = moment().subtract(2, "days").endOf("day").format();
      timeframeEp = "1D";
      break;
    case "1Y":
      start = moment().subtract(1, "years").startOf("day").format();
      end = moment().subtract(2, "days").endOf("day").format();
      timeframeEp = "1W";
      break;
    default:
      start = moment().subtract(2, "days").startOf("day").format();
      end = moment().subtract(2, "days").endOf("day").format();
      timeframeEp = "1H";
      break;
  }

  return { start, end, timeframeEp };
};

export const useStockData = (timeframe: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataStock, setDataStock] = useState<CandlestickChartItem[]>([]);
  const [dataLine, setDataLine] = useState<LineChartProps | null>(null);
  const stockValue = useAppSelector((state) => state.stock.value);
  const dispatch = useAppDispatch();
  const webSocket = FinnhubWebSocket.getInstance();

  const fetchStockData = async () => {
    const { start, end, timeframeEp } = getDateRange(timeframe);

    setIsLoading(true);

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
    if (timeframe === "live") {
      // let lastTimestamp = 0;
      let firstPrice = 0;
      webSocket.subscribe(stockValue as string);

      const messageHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        const item = data.type === "trade" ? data.data[0] : null;
        if (item) {
          // lastTimestamp = item.t;
          const date = new Date(item.t);
          const today = new Date();
          const timeString = `${today.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          if (firstPrice === 0) {
            firstPrice = item.p;
          }
          setDataLine((prev) => {
            if (prev) {
              return {
                seriesData: [...prev.seriesData, item.p],
                categories: [...prev.categories, timeString],
              };
            } else {
              return {
                seriesData: [item.p],
                categories: [timeString],
              };
            }
          });
          const change = item.p - firstPrice;
          const changePercent = (change / firstPrice) * 100;
          dispatch(
            setQuoteData({
              price: item.p,
              change: parseFloat(change.toFixed(2)),
              changePercent: Math.round(changePercent * 100) / 100,
            })
          );
        }
      };

      webSocket.setOnMessageHandler(messageHandler);

      return () => {
        webSocket.setOnMessageHandler(() => {});
      };
    } else {
      fetchStockData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockValue, timeframe]);

  return { isLoading, dataStock, dataLine };
};
