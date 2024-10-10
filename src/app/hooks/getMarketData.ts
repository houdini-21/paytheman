/**
 * Interface representing the properties required to fetch market data.
 */
interface FetchMarketDataProps {
  /** Stock symbol for the data request */
  symbol: string;
  /** Optional timeframe for the data request (e.g., "1T" for 1 minute) */
  timeframe?: string;
  /** Optional start date for historical data request */
  start?: string;
  /** Optional end date for historical data request */
  end?: string;
}

/**
 * Interface representing the structure of historical data fetched from the market.
 */
export interface FetchHistoricalDataProps {
  /** Close price */
  c: number;
  /** High price */
  h: number;
  /** Low price */
  l: number;
  /** Number of trades */
  n: number;
  /** Open price */
  o: number;
  /** Timestamp for the data */
  t: string;
  /** Volume traded */
  v: number;
  /** Volume-weighted average price */
  vw: number;
}

/**
 * Interface representing a market symbol, including its description and symbol.
 */
interface MarketSymbol {
  /** Stock symbol */
  symbol: string;
  /** Description of the stock */
  description: string;
}

/**
 * Fetches market symbols based on a search parameter.
 *
 * @param searchParam - Optional search parameter to filter symbols.
 * @returns An array of market symbols formatted for selection components (label and value).
 */
export const getMarketSymbols = async (searchParam?: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${searchParam}&exchange=US&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  const marketSymbols = response.result.map((symbol: MarketSymbol) => ({
    label: `${symbol.description} (${symbol.symbol})`,
    value: symbol.symbol,
  }));

  return marketSymbols;
};

/**
 * Fetches detailed information about a specific stock.
 *
 * @param stockSymbol - The stock symbol to fetch details for.
 * @returns An object containing detailed information about the stock.
 */
export const getStockDetails = async (stockSymbol: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${stockSymbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  return response;
};

/**
 * Fetches historical market data for a specific stock within a given timeframe.
 *
 * @param FetchMarketDataProps - Object containing the stock symbol, timeframe, start, and end dates.
 * @returns An array of historical data bars for the given stock.
 */
export const fetchHistoricalData = async ({
  symbol,
  timeframe = "1T",
  start,
  end,
}: FetchMarketDataProps) => {
  const response = await fetch(
    `https://data.alpaca.markets/v2/stocks/${symbol}/bars?start=${start}&end=${end}&timeframe=${timeframe}`,
    {
      headers: {
        "APCA-API-KEY-ID": process.env.NEXT_PUBLIC_ALPACA_API_KEY_ID as string,
        "APCA-API-SECRET-KEY": process.env
          .NEXT_PUBLIC_ALPACA_API_SECRET_KEY as string,
      },
    }
  );
  const data = await response.json();
  return data.bars;
};

/**
 * Fetches the current status of the stock market (open/closed).
 *
 * @returns The current market status for US exchanges.
 */
export const marketStatus = async () => {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  return response;
};
