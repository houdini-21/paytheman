import { SelectComponent } from "@/app/Components";
import { useFormLogic } from "./hooks/useFormHook";

export const Form = () => {
  const { formik, isLoading, options, setSearchParam } = useFormLogic();

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
