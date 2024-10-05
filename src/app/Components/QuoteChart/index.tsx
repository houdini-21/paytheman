"use client";
import ReactApexChart from "react-apexcharts";
import { CandlestickChartProps } from "./interfaces";

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  seriesData,
}) => {
  return (
    <div id="chart">
      <ReactApexChart
        options={{
          chart: {
            type: "candlestick",
            height: 350,
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
        height={350}
      />
    </div>
  );
};
