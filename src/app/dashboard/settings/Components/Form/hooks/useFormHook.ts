import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Store";
import { addCard } from "@/Store/Card/cardSlice";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

export const useFormLogic = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  const cardsList = useAppSelector((state) => state.card.cards);
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

  return {
    formik,
    isLoading,
    options,
    setSearchParam,
  };
};
