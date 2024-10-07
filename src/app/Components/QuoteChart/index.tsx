import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { CandlestickChartProps, LineChartProps } from "./interfaces";

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

export const LineChart = ({
  seriesData = [],
  categories = [],
}: LineChartProps) => {
  return (
    <div id="w-full">
      <ReactApexChart
        options={{
          chart: {
            type: "line",
            toolbar: {
              show: false,
            },
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 1000,
              },
            },
          },
          stroke: {
            curve: "smooth",
          },
          colors: ["#22c55e"],
          xaxis: {
            categories: categories,
            type: "datetime",
          },

          tooltip: {
            style: {
              fontSize: "14px",
            },
          },
        }}
        series={[
          {
            name: "Price",
            data: seriesData,
          },
        ]}
        type="line"
        height={500}
      />
    </div>
  );
};
