import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/Store";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

interface PriceDetails {
  /** The current price of the stock */
  price: number | null;
  /** The change in price from the previous close */
  change: number | null;
  /** The percentage change from the previous close */
  percentage: number | null;
  /** The previous close price */
  closePrice: number | null;
}

interface PriceContextType {
  /** Object holding price details for each symbol */
  prices: Record<string, PriceDetails>;
  /** Function to subscribe to a stock symbol */
  subscribeToSymbol: (symbol: string) => void;
}

/** Context to hold and provide price data */
const PriceContext = createContext<PriceContextType | null>(null);

/**
 * Hook to access the PriceContext
 * @throws Will throw an error if used outside of a PriceProvider
 * @returns The price context value
 */
export const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};

/**
 * Provider component for the PriceContext. It subscribes to stock symbols,
 * listens for WebSocket price updates, and manages the price state.
 *
 * @param children - The child components that will have access to the context
 */
export const PriceProvider = ({ children }: { children: React.ReactNode }) => {
  /** List of card items from the Redux store */
  const itemsList = useAppSelector((state) => state.card.cards);
  /** Ref to hold the current items list */
  const itemsListRef = useRef(itemsList);
  /** State to hold the price data for symbols */
  const [prices, setPrices] = useState<Record<string, PriceDetails>>({});
  /** Ref to hold the current prices state */
  const pricesRef = useRef(prices);
  /** Instance of the Finnhub WebSocket for handling connections */
  const webSocket = FinnhubWebSocket.getInstance();

  /** Update items list reference when items list changes */
  useEffect(() => {
    itemsListRef.current = itemsList;
  }, [itemsList]);

  /** Update prices reference when prices state changes */
  useEffect(() => {
    pricesRef.current = prices;
  }, [prices]);

  /**
   * Handles incoming trade data and updates the price state.
   * Fetches the previous close price if not already available.
   *
   * @param symbol - The stock symbol being updated
   * @param trade - The trade data containing price and time
   */
  useEffect(() => {
    const handlePriceUpdate = async (
      symbol: string,
      trade: { p: number; c: number; t: number }
    ) => {
      const currentPrices = pricesRef.current;

      // If the close price is already available, calculate the change and percentage
      // Otherwise, fetch the close price and calculate the change and percentage
      if (currentPrices[symbol]) {
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

    /** Holds timestamps of the last update for each symbol to prevent frequent updates */
    const lastUpdateTimestamps: Record<string, number> = {};

    /**
     * Handles incoming WebSocket messages and processes trade updates.
     * @param event - The WebSocket message event containing trade data
     */
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
          return;
        }

        if (
          !lastUpdateTimestamps[symbol] ||
          currentTime - lastUpdateTimestamps[symbol] >= 5000
        ) {
          lastUpdateTimestamps[symbol] = currentTime;
          handlePriceUpdate(symbol, trade);
        }
      }
    };

    /** Sets the WebSocket message handler */
    webSocket.setOnMessageHandler(messageHandler);

    /** Cleanup the WebSocket message handler on unmount */
    return () => {
      webSocket.setOnMessageHandler(() => {});
    };
  }, [webSocket]);

  /**
   * Subscribes to a stock symbol using the WebSocket.
   *
   * @param symbol - The stock symbol to subscribe to.
   */
  const subscribeToSymbol = (symbol: string) => {
    webSocket.subscribe(symbol);
  };

  /** Provides the price data and subscription function to child components */
  return (
    <PriceContext.Provider value={{ prices, subscribeToSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};
