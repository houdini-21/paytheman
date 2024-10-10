import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/Store";
import { addNotification } from "@/Store/Notification/notificationSlice";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

/**
 * Custom hook for handling the notification form logic.
 * This hook manages form state, validation, and symbol fetching for market data.
 *
 * @returns An object containing formik, isLoading, options, and setSearchParam.
 */
export const useNotificationForm = () => {
  /** Indicates if the market symbol data is loading */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** Search parameter used for querying market symbols */
  const [searchParam, setSearchParam] = useState<string>("");
  /** List of options for the company select input */
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  /** Dispatch function to send actions to the Redux store */
  const dispatch = useAppDispatch();

  /**
   * Formik instance for managing form state and handling validation.
   */
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
    /**
     * Function called when the form is submitted.
     * Validates the inputs and dispatches the notification to the Redux store.
     *
     * @param values - The current form values.
     */
    onSubmit: (values) => {
      // Ensure all fields are filled
      if (
        !values.companyName.value ||
        !values.situation.value ||
        !values.price
      ) {
        toast.error("Please fill all fields!");
        return;
      }

      // Validate that the price is a valid number
      if (isNaN(Number(values.price))) {
        toast.error("Price must be a number!");
        return;
      }

      // Ensure the price is non-negative
      if (Number(values.price) < 0) {
        toast.error("Price cannot be negative!");
        return;
      }

      // Dispatch the notification to the Redux store
      dispatch(
        addNotification({
          id: new Date().getTime(),
          companyName: values.companyName,
          companySymbol: values.companyName.value,
          situation: values.situation,
          price: Number(values.price),
        })
      );

      // Reset the form after submission
      formik.resetForm();
      formik.setFieldValue("companyName", null);
      formik.setFieldValue("situation", null);
      toast.success("Notification added successfully!");
    },
  });

  /**
   * Fetches market symbols based on the current search parameter.
   * Updates the options for the company select input.
   */
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
