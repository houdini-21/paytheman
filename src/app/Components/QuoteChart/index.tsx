import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { CandlestickChartProps } from "./interfaces";

export const CandlestickChart = ({ seriesData }: CandlestickChartProps) => {
  return (
    <div id="w-full">
      <ReactApexChart
        options={{
          chart: {
            type: "candlestick",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: "#22c55e",
                downward: "#ef4444",
              },
            },
          },
          tooltip: {
            style: {
              fontSize: "14px",
            },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: false,
            },
          },
        }}
        series={[{ data: seriesData }]}
        type="candlestick"
        height={500}
      />
    </div>
  );
};
