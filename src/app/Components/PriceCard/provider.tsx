import { createContext, useContext, useEffect, useState } from "react";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

interface PriceContextType {
  prices: Record<
    string,
    { price: number | null; change: number | null; percentage: number | null }
  >;
  subscribeToSymbol: (symbol: string) => void;
}

const PriceContext = createContext<PriceContextType | null>(null);

export const usePriceContext = () => {
  return useContext(PriceContext);
};

export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  const [prices, setPrices] = useState<
    Record<
      string,
      { price: number | null; change: number | null; percentage: number | null }
    >
  >({});
  const webSocket = FinnhubWebSocket.getInstance();

  useEffect(() => {
    let lastTimestamp = 0;

    const handlePriceUpdate = async (symbol: string, trade: any) => {
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
        },
      }));
    };

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "trade" && data.data.length > 0) {
        const trade = data.data[0];
        if (trade.t - lastTimestamp >= 1000) {
          lastTimestamp = trade.t;
          handlePriceUpdate(trade.s, trade);
        }
      }
    };

    webSocket.setOnMessageHandler(messageHandler);
  }, []);

  const subscribeToSymbol = (symbol: string) => {
    webSocket.subscribe(symbol);
  };

  return (
    <PriceContext.Provider value={{ prices, subscribeToSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};
