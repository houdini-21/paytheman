import { SelectComponent } from "@/app/Components";
import { useNotificationForm } from "./hooks/useFormHook";

const Form = () => {
  const { formik, isLoading, options, setSearchParam } = useNotificationForm();

  return (
    <form
      className="flex lg:flex-row flex-col w-full items-end justify-between mt-4 gap-4"
      onSubmit={formik.handleSubmit}
    >
      <div className="lg:w-4/12 w-full">
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
      <div className="lg:w-4/12 w-full">
        <SelectComponent
          label="Select a situation"
          placeholder="Select a situation"
          nameInput="situation"
          selectedOption={formik.values.situation}
          options={[
            { value: "up", label: "Price goes up" },
            { value: "down", label: "Price goes down" },
          ]}
          onChange={(selectedOption) => {
            formik.setFieldValue("situation", selectedOption);
          }}
          stylesDefault
        />
      </div>
      <div className="lg:w-3/12 w-full">
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
