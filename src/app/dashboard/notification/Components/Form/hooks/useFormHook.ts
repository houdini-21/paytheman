import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/Store";
import { addNotification } from "@/Store/Notification/notificationSlice";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

export const useNotificationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParam, setSearchParam] = useState<string>("");
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
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
      if (
        !values.companyName.value ||
        !values.situation.value ||
        !values.price
      ) {
        toast.error("Please fill all fields!");
        return;
      }

      dispatch(
        addNotification({
          id: new Date().getTime(),
          companyName: values.companyName,
          companySymbol: values.companyName.value,
          situation: values.situation,
          price: Number(values.price),
        })
      );

      formik.resetForm();
      formik.setFieldValue("companyName", null);
      formik.setFieldValue("situation", null);
      toast.success("Notification added successfully!");
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
