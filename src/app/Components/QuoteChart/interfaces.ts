export interface QuoteChartItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
export interface QuoteChartProps {
  data: QuoteChartItem[];
}

export interface CandlestickChartItem {
  x: string;
  y: [number, number, number, number];
}
export interface CandlestickChartProps {
  seriesData: CandlestickChartItem[];
}
