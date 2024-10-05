interface FetchMarketDataProps {
  symbol: string;
  timeframe?: string;
  start?: string;
  end?: string;
}
export const getMarketSymbols = async (searchParam?: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${searchParam}&exchange=US&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  const marketSymbols = response.result.map((symbol: any) => ({
    label: `${symbol.description} (${symbol.symbol})`,
    value: symbol.symbol,
  }));

  return marketSymbols;
};

export const getStockDetails = async (stockSymbol: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${stockSymbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  return response;
};

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

export const getQuoteData = async (symbol: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
  ).then((res) => res.json());

  return response;
};
