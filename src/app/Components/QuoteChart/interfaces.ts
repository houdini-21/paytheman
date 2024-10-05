export interface QuoteChartItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
export interface QuoteChartProps {
  data: QuoteChartItem[];
}
export interface CandlestickChartProps {
  seriesData: Array<{ x: string; y: [number, number, number, number] }>;
}
