import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

interface TableProps {
  id: number;
  companyName: string;
  situation: string;
}

interface TablePropsList {
  tableItems: TableProps[];
}

const Table = ({ tableItems }: TablePropsList) => {
  return (
    <table className="border-collapse w-full mt-4">
      <thead>
        <tr>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Company name
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Situation
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {tableItems.map((item: TableProps) => (
          <tr
            key={item.id}
            className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
          >
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              {item.companyName}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              {item.situation}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600 text-xl"
              >
                <FaPencilAlt />
              </button>
              <button
                type="button"
                className="text-red-500 hove:text-red-600 pl-6 text-xl"
              >
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
