"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Store";
import { setStock, resetStock } from "@/Store/Stock/stockSlice";
import { SelectComponent } from "@/Components";
import getMarketSymbols from "@/app/hooks/getMarketSymbols";
import { SelectComponentItem } from "@/Components/Select/interfaces";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  const stockName = useAppSelector((state) => state.stock.label);
  const stockValue = useAppSelector((state) => state.stock.value);
  const dispatch = useAppDispatch();

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
      <SelectComponent
        label="Select a stock"
        selectedOption={
          stockValue
            ? {
                value: stockValue,
                label: stockName,
              }
            : null
        }
        options={options}
        isLoading={isLoading}
        clearValue={() => {
          dispatch(resetStock());
        }}
        onChange={(selectedOption) => {
          dispatch(setStock(selectedOption));
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
