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

    const lastUpdateTimestamps: Record<string, number> = {};

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "trade" && data.data.length > 0) {
        const trade = data.data[0];
        const currentTime = Date.now();

        // Verificar si ha pasado al menos 5 segundos desde la última actualización
        if (
          !lastUpdateTimestamps[trade.s] ||
          currentTime - lastUpdateTimestamps[trade.s] >= 5000
        ) {
          console.log("Actualizando precio de:", trade.s);
          lastUpdateTimestamps[trade.s] = currentTime;
          handlePriceUpdate(trade.s, trade);
        }
      }
    };

    // Asignar el manejador de mensajes del WebSocket
    webSocket.setOnMessageHandler(messageHandler);

    return () => {
      // Limpiar el manejador de mensajes al desmontar el componente
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
