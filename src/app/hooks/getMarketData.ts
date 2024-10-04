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
