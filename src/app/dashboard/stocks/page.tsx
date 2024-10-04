import Form from "./Components/Form";

export default function StocksPage() {
  return (
    <div className="px-12">
      <h1 className="text-3xl font-bold text-white">$120.00</h1>
      <p className="text-slate-200">+79 00% Today</p>
      <div className="w-full flex flex-row">
        <div className="w-10/12 mr-5">
          <div className="w-full h-96 pt-8"></div>
        </div>
        <div className="w-2/12 bg-neutral-900 ml-5 rounded">
          <Form />
        </div>
      </div>
    </div>
  );
}
