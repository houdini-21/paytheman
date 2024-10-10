import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/Store";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

interface PriceDetails {
  price: number | null;
  change: number | null;
  percentage: number | null;
  closePrice: number | null;
}

interface PriceContextType {
  prices: Record<string, PriceDetails>;
  subscribeToSymbol: (symbol: string) => void;
}

const PriceContext = createContext<PriceContextType | null>(null);

export const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const itemsList = useAppSelector((state) => state.card.cards);
  const itemsListRef = useRef(itemsList);
  const [prices, setPrices] = useState<Record<string, PriceDetails>>({});
  const pricesRef = useRef(prices);
  const webSocket = FinnhubWebSocket.getInstance();

  useEffect(() => {
    itemsListRef.current = itemsList;
  }, [itemsList]);

  useEffect(() => {
    pricesRef.current = prices;
  }, [prices]);

  useEffect(() => {
    const handlePriceUpdate = async (
      symbol: string,
      trade: { p: number; c: number; t: number }
    ) => {
      const currentPrices = pricesRef.current;

      if (currentPrices[symbol]) {
        console.log("Symbol found in prices object: ", currentPrices[symbol]);
        const newPrice = trade.p;
        const newChange = newPrice - currentPrices[symbol].closePrice!;
        const newPercentage =
          ((newPrice - currentPrices[symbol].closePrice!) /
            currentPrices[symbol].closePrice!) *
          100;

        setPrices((prevPrices) => ({
          ...prevPrices,
          [symbol]: {
            price: newPrice,
            change: newChange,
            percentage: newPercentage,
            closePrice: currentPrices[symbol].closePrice,
          },
        }));
      } else {
        console.log("Symbol not found in prices object: ", symbol);
        try {
          const responseQuote = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
          );
          const quote = await responseQuote.json();
          const newPrice = trade.p;
          const newChange = newPrice - quote.c;
          const newPercentage = ((newPrice - quote.c) / quote.c) * 100;

          setPrices((prevPrices) => ({
            ...prevPrices,
            [symbol]: {
              price: newPrice,
              change: newChange,
              percentage: newPercentage,
              closePrice: quote.c,
            },
          }));
        } catch (error) {
          console.error("Error fetching price data: ", error);
        }
      }
    };

    const lastUpdateTimestamps: Record<string, number> = {};

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "trade" && data.data.length > 0) {
        const trade = data.data[0];
        const symbol = trade.s;
        const currentTime = Date.now();

        const symbolExistsInItemsList = itemsListRef.current.some(
          (item) => item.companySymbol === symbol
        );

        if (!symbolExistsInItemsList) {
          console.log(
            `Symbol ${symbol} not found in items list`,
            itemsListRef.current
          );
          return;
        }

        if (
          !lastUpdateTimestamps[symbol] ||
          currentTime - lastUpdateTimestamps[symbol] >= 5000
        ) {
          console.log("Updating price for symbol: ", symbol);
          lastUpdateTimestamps[symbol] = currentTime;
          handlePriceUpdate(symbol, trade);
        }
      }
    };

    webSocket.setOnMessageHandler(messageHandler);

    return () => {
      webSocket.setOnMessageHandler(() => {});
    };
  }, [webSocket]);

  const subscribeToSymbol = (symbol: string) => {
    webSocket.subscribe(symbol);
  };

  return (
    <PriceContext.Provider value={{ prices, subscribeToSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};
