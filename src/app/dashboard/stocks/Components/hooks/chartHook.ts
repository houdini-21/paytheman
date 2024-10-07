import { useState, useEffect, useRef } from "react";
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
import moment from "moment";

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
  const [firstPrice, setFirstPrice] = useState<number>(0);
  const stockValue = useAppSelector((state) => state.stock.value);
  const dispatch = useAppDispatch();
  const socketRef = useRef<WebSocket | null>(null);

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
      if (socketRef.current) {
        socketRef.current.close();
      }

      setDataLine(null);

      const socket = new WebSocket(
        `wss://ws.finnhub.io?token=crvgfehr01qkji45k8tgcrvgfehr01qkji45k8u0`
      );
      socketRef.current = socket;

      let lastTimestamp = 0;

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: "subscribe",
            symbol: stockValue,
          })
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const item = data.type === "trade" ? data.data[0] : null;
        if (item) {
          const itemTimestamp = item.t;
          if (itemTimestamp - lastTimestamp >= 10000) {
            lastTimestamp = itemTimestamp;
            const date = new Date(item.t);
            const today = new Date();
            const timeString = `${today.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            if (firstPrice === 0) {
              setFirstPrice(item.p);
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
        }
      };

      socket.onclose = () => {
        console.log("WebSocket closed");
      };

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    } else {
      fetchStockData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockValue, timeframe]);

  return { isLoading, dataStock, dataLine };
};
