import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SelectComponent } from "@/app/Components";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);

  const formik = useFormik({
    initialValues: {
      companyName: {
        value: "",
        label: "",
      },
      situation: {
        value: "",
        label: "",
      },
      price: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
    <form
      className="flex flex-row w-full items-end justify-between mt-4 gap-4"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-4/12">
        <SelectComponent
          label="Select a Company"
          placeholder="Select a Company"
          nameInput="companyName"
          options={options}
          onChange={(selectedOption) => {
            formik.setFieldValue("companyName", selectedOption);
          }}
          stylesDefault
        />
      </div>
      <div className="w-4/12">
        <SelectComponent
          label="Select a situation"
          placeholder="Select a situation"
          nameInput="situation"
          options={[
            { value: "1", label: "Price goes up" },
            { value: "2", label: "Price goes down" },
          ]}
          onChange={(selectedOption) => {
            formik.setFieldValue("situation", selectedOption);
          }}
          stylesDefault
        />
      </div>
      <div className="w-3/12">
        <div className="flex flex-col my-2">
          <label className="text-black text-sm mb-1">Price</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="w-full px-2 py-[6px] rounded border border-gray-300"
          />
        </div>
      </div>
      <div className="w-1/12">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg w-24 py-2 mb-2"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
