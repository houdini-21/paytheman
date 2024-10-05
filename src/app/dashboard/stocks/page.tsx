import Titles from "./Components/Titles";
import Details from "./Components/Details";
import { Chart } from "./Components/Chart";

export default function StocksPage() {
  return (
    <div className="px-12">
      <Titles />
      <div className="w-full flex flex-row mt-8">
        <div className="w-10/12 mr-5">
          <div className="w-full h-auto">
            <Chart />
          </div>
        </div>
        <div className="w-2/12 bg-zinc-900 rounded-lg shadow-lg">
          <Details />
        </div>
      </div>
    </div>
  );
}
