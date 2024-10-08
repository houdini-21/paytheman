import { createContext, useContext, useEffect, useState } from "react";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

interface PriceDetails {
  price: number | null;
  change: number | null;
  percentage: number | null;
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
  const [prices, setPrices] = useState<Record<string, PriceDetails>>({});
  const webSocket = FinnhubWebSocket.getInstance();

  useEffect(() => {
    const handlePriceUpdate = async (
      symbol: string,
      trade: {
        p: number;
        c: number;
        t: number;
      }
    ) => {
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
          },
        }));
      } catch (error) {
        console.error("Error fetching price data: ", error);
      }
    };

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade" && data.data.length > 0) {
        const trade = data.data[0];
        handlePriceUpdate(trade.s, trade);
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
