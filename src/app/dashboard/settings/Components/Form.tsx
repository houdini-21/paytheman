import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Store";
import { addCard } from "@/Store/Card/cardSlice";
import { SelectComponent } from "@/app/Components";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  const cardsList = useAppSelector((state) => state.card.items);
  const dispatch = useAppDispatch();

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
      if (!values.companyName.value) {
        toast.error("Please fill all fields!");
        return;
      }

      if (
        cardsList.some(
          (card) => card.companySymbol === values.companyName.value
        )
      ) {
        toast.error("This card already exists!");
        return;
      }

      if (cardsList.length < 6) {
        dispatch(
          addCard({
            id: new Date().getTime(),
            companyName: values.companyName,
            companySymbol: values.companyName.value,
          })
        );
      } else {
        toast.error("You can only add 6 cards!");
        return;
      }

      formik.resetForm();
      formik.setFieldValue("companyName", null);
      toast.success("Card added successfully!");
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
      className="flex lg:flex-row flex-col w-full items-end justify-start mt-4 gap-4"
      onSubmit={formik.handleSubmit}
    >
      <div className="lg:w-3/12 w-full">
        <SelectComponent
          label="Select a Company"
          placeholder="Select a Company"
          nameInput="companyName"
          options={options}
          selectedOption={formik.values.companyName}
          onChange={(selectedOption) => {
            formik.setFieldValue("companyName", selectedOption);
          }}
          onInputChange={(value) => setSearchParam(value)}
          isLoading={isLoading}
          stylesDefault
        />
      </div>

      <div className="lg:w-1/12 w-full">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg lg:w-24 py-2 mb-2 w-full"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
