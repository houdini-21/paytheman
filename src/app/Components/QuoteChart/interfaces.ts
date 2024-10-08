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
