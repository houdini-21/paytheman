export interface QuoteChartItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
export interface QuoteChartProps {
  data: QuoteChartItem[];
}
