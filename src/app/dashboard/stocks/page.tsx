"use client";
import Titles from "./Components/Titles";
import Details from "./Components/Details";
import { Chart } from "./Components/Chart";
import useFinnhubWebSocket from "@/app/utils/finnhubWebSocket";

export default function StocksPage() {
  useFinnhubWebSocket("AAPL");
  return (
    <div className="lg:px-12 px-6">
      <Titles />
      <div className="w-full flex lg:flex-row flex-col mt-8">
        <div className="lg:w-10/12 lg:mr-5 w-full">
          <div className="w-full h-[600px] lg:h-[500px]">
            <Chart />
          </div>
        </div>
        <div className="lg:w-2/12 bg-zinc-900 rounded-lg shadow-lg w-full">
          <Details />
        </div>
      </div>
    </div>
  );
}
