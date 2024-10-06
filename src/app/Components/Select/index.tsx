"use client";
import Select from "react-select";
import { SelectComponentProps } from "./interfaces";

export const SelectComponent = ({
  options,
  onChange,
  onInputChange,
  placeholder,
  isLoading,
  label,
  selectedOption,
  stylesDefault,
  nameInput,
}: SelectComponentProps) => {
  return (
    <div className="w-full flex flex-col my-2">
      <label
        className={
          stylesDefault ? "text-black text-sm mb-1" : "text-white text-sm mb-1"
        }
      >
        {label}
      </label>
      <Select
        options={options}
        isSearchable
        isClearable={false}
        name={nameInput || label}
        placeholder={placeholder}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={onChange as any}
        value={selectedOption}
        isLoading={isLoading}
        onInputChange={onInputChange}
        backspaceRemovesValue={false}
        styles={
          stylesDefault
            ? {}
            : {
                valueContainer: (base) => ({
                  ...base,
                  color: "#FFFFFF",
                }),
                control: (base, state) => ({
                  ...base,
                  background: "#1F1F1F",
                  borderColor: state.isFocused ? "#FFFFFF" : "#000000",
                  boxShadow: "none",
                  color: "#FFFFFF",
                  "&:hover": {
                    borderColor: state.isFocused ? "#FFFFFF" : "#000000",
                  },
                }),
                input: (base) => ({
                  ...base,
                  color: "#FFFFFF", // Letras blancas cuando escribes
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#FFFFFF",
                }),
                option: (styles, { isFocused, isSelected }) => {
                  return {
                    ...styles,
                    backgroundColor: isSelected
                      ? "#22c55e"
                      : isFocused
                      ? "#3A3A3A"
                      : "#1F1F1F",
                    color: isSelected
                      ? "#FFFFFF"
                      : isFocused
                      ? "#FFFFFF"
                      : "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#3A3A3A",
                      color: "#FFFFFF",
                    },
                  };
                },
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1F1F1F",
                }),
              }
        }
      />
    </div>
  );
};
