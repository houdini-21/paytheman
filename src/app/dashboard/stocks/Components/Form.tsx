"use client";
import { useState, useEffect } from "react";
import { SelectComponent } from "@/app/Components";
import getMarketSymbols from "@/app/hooks/getMarketSymbols";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SelectComponentItem | null>(null);

  useEffect(() => {
    const fetchMarketSymbols = async () => {
      setIsLoading(true);
      const response = await getMarketSymbols(searchParam);

      setOptions(response);
      setIsLoading(false);
    };
    fetchMarketSymbols();
  }, [searchParam]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white">Buy</h1>
      <SelectComponent
        label="Stock"
        selectedOption={selectedOption}
        options={options}
        isLoading={isLoading}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
        }}
        onInputChange={(inputValue) => {
          setSearchParam(inputValue);
        }}
        placeholder="Search for a stock"
      />
    </div>
  );
};

export default Form;
