import { Chart, Details, Titles } from "./Components";

export default async function StocksPage() {
  return (
    <div className="lg:px-12 px-6">
      <Titles />
      <div className="w-full flex lg:flex-row flex-col mt-8">
        <div className="lg:w-10/12 lg:mr-5 w-full">
          <div className="w-full h-[600px] lg:h-[500px]">
            <Chart />
          </div>
        </div>
        <div className="lg:w-2/12 dark:bg-zinc-900 bg-gray-100 rounded-lg shadow-lg w-full">
          <Details />
        </div>
      </div>
    </div>
  );
}
