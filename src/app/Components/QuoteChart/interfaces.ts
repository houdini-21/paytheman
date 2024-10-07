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

export interface LineChartProps {
  seriesData: number[];
  categories: string[];
}

export interface CandlestickChartProps {
  seriesData: CandlestickChartItem[];
}
