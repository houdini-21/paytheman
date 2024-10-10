import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/Store";
import { addCard } from "@/Store/Card/cardSlice";
import { getMarketSymbols } from "@/app/hooks/getMarketData";
import { SelectComponentItem } from "@/app/Components/Select/interfaces";

/**
 * Custom hook for managing the form logic related to adding cards.
 * This hook manages form state, validation, market symbol fetching, and card limit.
 *
 * @returns An object containing formik, isLoading, options, and setSearchParam.
 */
export const useFormLogic = () => {
  /** Loading state for fetching market symbols */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /** Search parameter used for querying market symbols */
  const [searchParam, setSearchParam] = useState<string>("");
  /** List of options for the company select input */
  const [options, setOptions] = useState<SelectComponentItem[]>([]);
  /** List of cards from the Redux store */
  const cardsList = useAppSelector((state) => state.card.cards);
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
     * Validates the inputs and dispatches a new card to the Redux store.
     *
     * @param values - The current form values.
     */
    onSubmit: (values) => {
      // Ensure the company name is selected
      if (!values.companyName.value) {
        toast.error("Please fill all fields!");
        return;
      }

      // Check if the card already exists in the list
      if (
        cardsList.some(
          (card) => card.companySymbol === values.companyName.value
        )
      ) {
        toast.error("This card already exists!");
        return;
      }

      // Check if the user has reached the maximum of 6 cards
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

      // Reset the form after successful submission
      formik.resetForm();
      formik.setFieldValue("companyName", null);
      toast.success("Card added successfully!");
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
